"use client";

import React, { useState } from "react";
import { SportEvent, SportComment } from "@/types/sport";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  MessageSquare,
  Navigation,
  Send,
  Trash2,
  Edit3,
  X,
  MessageCircle,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { getCommentsByEvent, createComment, deleteComment } from "@/lib/sport-api";
import { useRole } from "@/context/role-context";
import { useLanguage } from "@/context/language-context";

interface EventsGridProps {
  events: SportEvent[];
  selectedCategory: string;
  onEditEvent?: (event: SportEvent) => void;
  onDeleteEvent?: (uuid: string) => Promise<void>;
}

const COMMENT_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
];

export function EventsGrid({
  events,
  selectedCategory,
  onEditEvent,
  onDeleteEvent,
}: EventsGridProps) {
  const [activeEventModal, setActiveEventModal] = useState<SportEvent | null>(null);
  const [comments, setComments] = useState<SportComment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const { isAdmin, user } = useRole();
  const { t, isKhmer } = useLanguage();

  // Filter events by category
  const filteredEvents = events.filter((ev) => {
    return (
      selectedCategory === "ALL" ||
      ev.category?.name?.toLowerCase() === selectedCategory.toLowerCase()
    );
  });

  // Open details modal and fetch comments for this event
  const handleOpenEventDetails = async (event: SportEvent) => {
    setActiveEventModal(event);
    setLoadingComments(true);
    setNewCommentText("");
    try {
      const data = await getCommentsByEvent(event.uuid);
      setComments(data);
    } catch (err) {
      console.error("Failed to load comments", err);
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEventModal || !newCommentText.trim() || isSubmittingComment) return;

    setIsSubmittingComment(true);
    try {
      const posted = await createComment({
        eventUuid: activeEventModal.uuid,
        comment: newCommentText.trim(),
      });
      const enhanced: SportComment = {
        ...posted,
        authorName: user?.username || (isKhmer ? "អ្នកគាំទ្រ" : "Fan Supporter"),
        avatarUrl: user?.avatarUrl || COMMENT_AVATARS[0],
      };
      setComments((prev) => [enhanced, ...prev]);
      setNewCommentText("");
    } catch {
      alert("Failed to submit comment. Please check API connection.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentUuid: string) => {
    if (!confirm(isKhmer ? "តើអ្នកប្រាកដជាចង់លុបមតិយោបល់នេះឬ?" : "Are you sure you want to delete this comment?")) return;
    try {
      await deleteComment(commentUuid);
      setComments((prev) => prev.filter((c) => c.uuid !== commentUuid));
    } catch {
      alert("Failed to delete comment");
    }
  };

  const getCleanImageUrl = (event: SportEvent) => {
    if (event.imageUrls && event.imageUrls.length > 0 && event.imageUrls[0]) {
      return event.imageUrls[0];
    }
    return "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&auto=format&fit=crop&q=60";
  };

  // Other related events to allow clicking between cards
  const relatedEvents = activeEventModal
    ? events.filter((e) => e.uuid !== activeEventModal.uuid).slice(0, 6)
    : [];

  return (
    <section id="events" className="mb-20 font-sans">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6FE56] ring-4 ring-[#C6FE56]/20" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#616D54]">
              {t("venues.tag", "Match Venues & Arenas")}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#12150D]">
            {t("venues.title", "Stadiums, Grounds & Events")}
          </h2>
          <p className="text-xs sm:text-sm text-[#616D54] mt-1">
            {t("venues.subtitle", "Click any arena card to view full venue specs, GPS map navigation, live fan discussion, and explore related venues")}
          </p>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="p-16 text-center rounded-3xl border border-dashed border-[#E2E6D5] bg-white">
          <p className="text-[#616D54] text-base font-semibold">
            {t("venues.noVenues", "No events found for this discipline.")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredEvents.map((event) => {
            const imageUrl = getCleanImageUrl(event);
            const mapsUrl = `https://www.google.com/maps?q=${event.latitude},${event.longitude}`;

            return (
              <Card
                key={event.uuid || event.id}
                onClick={() => handleOpenEventDetails(event)}
                className="group overflow-hidden rounded-[2rem] border border-[#E2E6D5] hover:border-[#12150D] transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between bg-white cursor-pointer"
              >
                <div>
                  <div className="relative w-full h-52 overflow-hidden bg-[#12150D]">
                    <img
                      src={imageUrl}
                      alt={event.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&auto=format&fit=crop&q=60";
                      }}
                    />
                    <div className="absolute top-3.5 left-3.5">
                      <span className="bg-[#C6FE56] text-[#12150D] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm">
                        {event.category?.name || "Venue"}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <MessageSquare className="w-3 h-3 text-[#C6FE56]" />
                      <span>{t("venues.discussion", "Discussion")}</span>
                    </div>
                  </div>

                  <CardHeader className="p-6 pb-2">
                    <h3 className="font-extrabold text-lg leading-snug line-clamp-2 text-[#12150D] dark:text-[#F8F9F3] group-hover:text-emerald-700 dark:group-hover:text-[#C6FE56] transition-colors">
                      {event.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#8E9B7E] dark:text-[#A2AF93] mt-1.5 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{event.locationName}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 pt-0">
                    <p className="text-sm text-[#616D54] dark:text-[#CBD5BE] line-clamp-3 leading-relaxed font-normal">
                      {event.description}
                    </p>
                  </CardContent>
                </div>

                <CardFooter className="p-6 pt-0 border-t border-[#EEF2E4] dark:border-[#212C18] mt-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {/* View Details Action */}
                    <span className="text-xs font-black text-[#12150D] dark:text-[#F8F9F3] flex items-center group-hover:text-emerald-700 dark:group-hover:text-[#C6FE56] transition-colors">
                      {t("sports.viewDetails", "View Details")}
                      <ChevronRight className="w-3.5 h-3.5 ml-0.5 text-[#616D54] dark:text-[#A2AF93] group-hover:translate-x-1 transition-transform" />
                    </span>

                    {/* Google Maps link */}
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center text-xs font-bold text-[#12150D] dark:text-[#F8F9F3] bg-[#EEF2E4] dark:bg-[#1E2816] hover:bg-[#C6FE56] dark:hover:bg-[#C6FE56] hover:text-[#12150D] dark:hover:text-[#12150D] px-3 py-1 rounded-full transition-colors"
                      title={t("venues.openInMaps", "Open in Maps")}
                    >
                      <Navigation className="w-3 h-3 mr-1" />
                      {t("venues.maps", "Maps")}
                    </a>
                  </div>

                  {/* Admin Controls */}
                  {isAdmin && (
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      {onEditEvent && (
                        <button
                          onClick={() => onEditEvent(event)}
                          className="w-8 h-8 rounded-full bg-[#EEF2E4] dark:bg-[#1E2816] hover:bg-[#C6FE56] dark:hover:bg-[#C6FE56] text-[#12150D] dark:text-[#F8F9F3] hover:text-[#12150D] dark:hover:text-[#12150D] flex items-center justify-center transition-all cursor-pointer"
                          title="Admin: Edit Venue"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {onDeleteEvent && (
                        <button
                          onClick={() => {
                            if (confirm(`Admin action: Delete event "${event.name}"?`)) {
                              onDeleteEvent(event.uuid);
                            }
                          }}
                          className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-600 flex items-center justify-center transition-all cursor-pointer"
                          title="Admin: Delete Venue"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {/* Comprehensive Event & Arena Details Modal */}
      {activeEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#151B10] border border-[#E2E6D5] dark:border-[#26331B] text-[#12150D] dark:text-[#F8F9F3] rounded-[2.5rem] p-6 sm:p-9 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveEventModal(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#EEF2E4] dark:bg-[#1E2816] flex items-center justify-center text-[#12150D] dark:text-[#F8F9F3] hover:bg-[#12150D] hover:text-[#C6FE56] cursor-pointer transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header info */}
            <div className="mb-5 pr-12">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-[#C6FE56] text-[#12150D] text-xs font-black px-3.5 py-1 rounded-full inline-block shadow-xs">
                  {activeEventModal.category?.name || "Match Arena"}
                </span>
                <span className="text-xs text-[#8E9B7E] dark:text-[#A2AF93] font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  {activeEventModal.locationName}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#12150D] dark:text-[#F8F9F3] leading-tight">
                {activeEventModal.name}
              </h2>
            </div>

            {/* Photo & GPS Banner */}
            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-6 bg-[#12150D] shadow-md group/img">
              <img
                src={getCleanImageUrl(activeEventModal)}
                alt={activeEventModal.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&auto=format&fit=crop&q=60";
                }}
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs">
                <div className="flex items-center gap-2 truncate">
                  <Navigation className="w-4 h-4 text-[#C6FE56] shrink-0" />
                  <span className="truncate font-semibold">
                    GPS: {activeEventModal.latitude.toFixed(4)}, {activeEventModal.longitude.toFixed(4)}
                  </span>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${activeEventModal.latitude},${activeEventModal.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C6FE56] hover:bg-[#B3E848] text-[#12150D] font-black text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1 shrink-0 transition-colors shadow-sm"
                >
                  <ExternalLink className="w-3 h-3" />
                  {t("venues.openInMaps", "Open in Maps")}
                </a>
              </div>
            </div>

            {/* Full Venue Description */}
            <div className="mb-8">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#616D54] dark:text-[#A2AF93] mb-2">
                {t("venues.overview", "Venue & Tournament Overview")}
              </h3>
              <p className="text-sm sm:text-base text-[#12150D]/90 dark:text-[#F8F9F3]/90 leading-relaxed font-normal">
                {activeEventModal.description}
              </p>
            </div>

            {/* Fan Discussion Feed */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#F8F9F3] dark:bg-[#0D1009] border border-[#E2E6D5] dark:border-[#26331B] mb-8">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E6D5] dark:border-[#26331B] mb-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-700 dark:text-[#C6FE56]" />
                  <h3 className="text-sm font-black text-[#12150D] dark:text-[#F8F9F3]">
                    {t("venues.commentsTitle", "Fan Community Discussion")} ({comments.length})
                  </h3>
                </div>
                <span className="text-[11px] text-[#8E9B7E] font-medium">
                  {t("venues.liveFeedback", "Live Match Feedback")}
                </span>
              </div>

              {/* Comments List */}
              <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1 mb-4">
                {loadingComments ? (
                  <div className="text-center py-8 text-xs text-[#8E9B7E] font-medium animate-pulse">
                    Loading arena comments...
                  </div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-8 px-4 rounded-2xl bg-white dark:bg-[#151B10] border border-[#E2E6D5] dark:border-[#26331B]">
                    <MessageCircle className="w-7 h-7 mx-auto text-[#8E9B7E]/50 mb-1.5" />
                    <p className="text-xs font-bold text-[#12150D] dark:text-[#F8F9F3]">
                      {t("venues.noComments", "No fan comments yet")}
                    </p>
                    <p className="text-[11px] text-[#616D54] dark:text-[#CBD5BE] mt-0.5">
                      {t("venues.beFirst", "Be the first supporter to leave a note about this arena!")}
                    </p>
                  </div>
                ) : (
                  comments.map((c, idx) => {
                    const commentAvatar = c.avatarUrl || COMMENT_AVATARS[idx % COMMENT_AVATARS.length];
                    const authorLabel = c.authorName || (isKhmer ? `អ្នកគាំទ្រ #${c.id || idx + 1}` : `Supporter #${c.id || idx + 1}`);

                    return (
                      <div
                        key={c.uuid || c.id}
                        className="p-3.5 rounded-2xl bg-white dark:bg-[#151B10] border border-[#E2E6D5] dark:border-[#26331B] flex items-start justify-between gap-3 shadow-2xs"
                      >
                        <div className="flex items-start gap-2.5 flex-1 min-w-0">
                          <img
                            src={commentAvatar}
                            alt="Commenter"
                            className="w-8 h-8 rounded-full object-cover border border-[#C6FE56] shrink-0 mt-0.5"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = COMMENT_AVATARS[0];
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-bold text-[#12150D] dark:text-[#F8F9F3] truncate">
                                {authorLabel}
                              </span>
                              <span className="text-[10px] text-[#8E9B7E] dark:text-[#A2AF93] font-medium shrink-0">
                                {c.createdAt
                                  ? new Date(c.createdAt).toLocaleTimeString(isKhmer ? "km-KH" : "en-US", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      month: "short",
                                      day: "numeric",
                                    })
                                  : "Recently posted"}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm font-semibold text-[#12150D] dark:text-[#CBD5BE] leading-relaxed break-words">
                              {c.comment}
                            </p>
                          </div>
                        </div>

                        {/* Admin or author can delete comment */}
                        {(isAdmin || c.uuid) && (
                          <button
                            onClick={() => handleDeleteComment(c.uuid)}
                            className="text-[#8E9B7E] hover:text-rose-600 p-1 rounded transition-colors cursor-pointer shrink-0"
                            title="Delete Comment"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Post New Comment Form */}
              <form onSubmit={handlePostComment} className="flex items-center gap-2">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className="w-9 h-9 rounded-full object-cover border-2 border-[#C6FE56] shrink-0 shadow-xs"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#12150D] text-[#C6FE56] flex items-center justify-center font-bold text-xs shrink-0 border border-[#2B3520]">
                    {user?.username?.[0] || "U"}
                  </div>
                )}
                <Input
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder={t("venues.placeholderComment", "Share match thoughts or venue tips...")}
                  className="rounded-full bg-white dark:bg-[#151B10] border-[#E2E6D5] dark:border-[#26331B] text-xs h-10 focus:ring-[#C6FE56] flex-1 text-[#12150D] dark:text-[#F8F9F3]"
                  disabled={isSubmittingComment}
                />
                <Button
                  type="submit"
                  disabled={!newCommentText.trim() || isSubmittingComment}
                  className="bg-[#12150D] dark:bg-[#C6FE56] hover:bg-[#1C2215] dark:hover:bg-[#B3E848] text-[#C6FE56] dark:text-[#12150D] font-bold rounded-full px-5 h-10 shrink-0 shadow-md text-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 mr-1" />
                  {isSubmittingComment ? t("venues.posting", "Posting...") : t("venues.post", "Post")}
                </Button>
              </form>
            </div>

            {/* Related Arenas / "Click Cards Each Other" */}
            {relatedEvents.length > 0 && (
              <div className="pt-6 border-t border-[#EEF2E4]">
                <div className="flex items-center justify-between mb-3.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#616D54]">
                    {t("venues.related", "Explore Other Venues & Arenas")}
                  </h4>
                  <span className="text-[11px] text-[#8E9B7E] font-medium">
                    {t("venues.clickSwitch", "Click any card to switch view")}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                  {relatedEvents.map((rel) => (
                    <div
                      key={rel.uuid || rel.id}
                      onClick={() => handleOpenEventDetails(rel)}
                      className="group/rel p-2.5 rounded-2xl border border-[#E2E6D5] bg-[#F8F9F3] hover:border-[#12150D] cursor-pointer transition-all hover:scale-[1.02] shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-full h-20 rounded-xl overflow-hidden bg-[#12150D] mb-2">
                          <img
                            src={getCleanImageUrl(rel)}
                            alt={rel.name}
                            className="w-full h-full object-cover group-hover/rel:scale-105 transition-transform"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 block truncate">
                          {rel.category?.name || "Arena"}
                        </span>
                        <p className="text-xs font-bold text-[#12150D] line-clamp-1">
                          {rel.name}
                        </p>
                      </div>
                      <span className="text-[10px] text-[#8E9B7E] flex items-center gap-1 mt-1 truncate">
                        <MapPin className="w-2.5 h-2.5 text-rose-500 shrink-0" />
                        <span className="truncate">{rel.locationName}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="mt-8 pt-5 border-t border-[#EEF2E4] flex items-center justify-between">
              {isAdmin ? (
                <div className="flex items-center gap-2">
                  {onEditEvent && (
                    <Button
                      size="sm"
                      onClick={() => {
                        onEditEvent(activeEventModal);
                        setActiveEventModal(null);
                      }}
                      className="rounded-full bg-[#12150D] text-[#C6FE56] hover:bg-[#1C2215] font-bold text-xs h-9 px-4"
                    >
                      <Edit3 className="w-3.5 h-3.5 mr-1.5" />
                      {t("venues.edit", "Edit Venue")}
                    </Button>
                  )}
                  {onDeleteEvent && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        if (confirm(`Admin action: Delete event "${activeEventModal.name}"?`)) {
                          onDeleteEvent(activeEventModal.uuid);
                          setActiveEventModal(null);
                        }
                      }}
                      className="rounded-full font-bold text-xs h-9 px-4"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                      {t("venues.delete", "Delete Venue")}
                    </Button>
                  )}
                </div>
              ) : (
                <div />
              )}

              <Button
                variant="outline"
                onClick={() => setActiveEventModal(null)}
                className="rounded-full border-[#E2E6D5] h-9 px-5 text-xs font-bold"
              >
                {t("sports.close", "Close")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
