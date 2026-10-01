"use client";

import React, { useState } from "react";
import { Mail, Search, CheckCircle2, Clock, Trash2, Send, Shield, User, ArrowLeft, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/language-context";
import Link from "next/link";

interface ContactMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  topic: string;
  message: string;
  date: string;
  status: "new" | "replied" | "pending";
}

export default function ContactPage() {
  const { isKhmer } = useLanguage();
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState<ContactMessage[]>([
    {
      id: "msg-1",
      senderName: "Dara Somnang",
      senderEmail: "dara.somnang@gmail.com",
      topic: "Kun Khmer Championship Tickets",
      message: "Are tickets for the Olympic Stadium Kun Khmer World Title Bout available for online purchase or only at the stadium gates?",
      date: "2026-10-01 18:30",
      status: "new",
    },
    {
      id: "msg-2",
      senderName: "Bopha Rath",
      senderEmail: "bopha.rath@tech.edu.kh",
      topic: "Angkor Half Marathon Registration",
      message: "Can universities register athletic teams for the 21km heritage race under institutional accreditation?",
      date: "2026-09-30 14:15",
      status: "replied",
    },
    {
      id: "msg-3",
      senderName: "Chan Piseth",
      senderEmail: "chan.piseth@olympic.gov.kh",
      topic: "Morodok Techo Stadium Schedule",
      message: "Inquiring about lighting schedule and training track availability for Kouprey National Team sessions next week.",
      date: "2026-09-29 09:40",
      status: "pending",
    },
  ]);

  const [activeReply, setActiveReply] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState("");
  const [repliedSuccess, setRepliedSuccess] = useState(false);

  const handleDelete = (id: string) => {
    if (!confirm(isKhmer ? "តើអ្នកប្រាកដជាចង់លុបសារនេះឬ?" : "Are you sure you want to delete this message?")) return;
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeReply) return;

    setMessages((prev) =>
      prev.map((m) => (m.id === activeReply.id ? { ...m, status: "replied" } : m))
    );
    setRepliedSuccess(true);
    setTimeout(() => {
      setRepliedSuccess(false);
      setActiveReply(null);
      setReplyText("");
    }, 1500);
  };

  const filtered = messages.filter(
    (m) =>
      m.senderName.toLowerCase().includes(search.toLowerCase()) ||
      m.senderEmail.toLowerCase().includes(search.toLowerCase()) ||
      m.topic.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16 font-sans">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#12150D] text-white border border-[#222919] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge className="bg-[#C6FE56] text-[#12150D] font-black border-0 mb-2">
            <Mail className="w-3.5 h-3.5 mr-1" />
            {isKhmer ? "សារ និងសំណួរអ្នកគាំទ្រ" : "Fan Communications & Inquiries"}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {isKhmer ? "ការគ្រប់គ្រងទំនាក់ទំនង" : "Inquiry Moderation Desk"}
          </h1>
          <p className="text-xs sm:text-sm text-[#8E9B7E] mt-1">
            {isKhmer
              ? "ឆ្លើយតបសាររបស់អ្នកគាំទ្រ សំបុត្រចូលទស្សនា និងសំណើព័ត៌មានកីឡា"
              : "Review, reply, and moderate fan inquiries, ticket requests, and feedback"}
          </p>
        </div>

        <Link href="/dashboard">
          <Button
            variant="outline"
            className="rounded-full border-[#2B3520] bg-[#1C2215] text-white hover:bg-[#252E1B] font-bold text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            {isKhmer ? "ត្រឡប់ទៅផ្ទាំងទិន្នន័យ" : "Back to Overview"}
          </Button>
        </Link>
      </div>

      {/* Main Messages List */}
      <div className="p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#151B10] border border-[#E2E6D5] dark:border-[#26331B] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-black text-[#12150D] dark:text-white">
              {isKhmer ? "សារទាំងអស់" : "All Messages"} ({filtered.length})
            </h2>
            <p className="text-xs text-[#616D54] dark:text-[#8E9B7E]">
              {isKhmer ? "សារទទួលបានពីទម្រង់ទំនាក់ទំនងគេហទំព័រ" : "Messages received from public contact forms"}
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E9B7E]" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isKhmer ? "ស្វែងរកសារ..." : "Search messages or sender..."}
              className="pl-10 rounded-full border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-xs h-10"
            />
          </div>
        </div>

        <div className="space-y-3.5">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-xs text-[#8E9B7E]">
              {isKhmer ? "មិនមានសារត្រូវបង្ហាញទេ" : "No messages found matching your search."}
            </div>
          ) : (
            filtered.map((msg) => (
              <div
                key={msg.id}
                className="p-5 rounded-2xl bg-[#F8F9F3] dark:bg-[#1C2215] border border-[#E2E6D5] dark:border-[#2B3520] flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-all hover:border-[#C6FE56]"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-sm text-[#12150D] dark:text-white flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#C6FE56]" />
                      {msg.senderName}
                    </span>
                    <span className="text-xs text-[#8E9B7E]">({msg.senderEmail})</span>
                    <Badge
                      className={`text-[10px] font-bold uppercase border-0 ${
                        msg.status === "new"
                          ? "bg-[#C6FE56] text-[#12150D]"
                          : msg.status === "replied"
                          ? "bg-emerald-700 text-white"
                          : "bg-amber-400 text-[#12150D]"
                      }`}
                    >
                      {msg.status}
                    </Badge>
                  </div>

                  <h4 className="text-xs font-bold text-[#12150D] dark:text-white">
                    {msg.topic}
                  </h4>
                  <p className="text-xs text-[#616D54] dark:text-[#A2AF93] leading-relaxed">
                    {msg.message}
                  </p>
                  <span className="text-[10px] text-[#8E9B7E] block">{msg.date}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                  <Button
                    size="sm"
                    onClick={() => setActiveReply(msg)}
                    className="h-8 px-3 rounded-full bg-[#12150D] dark:bg-[#C6FE56] text-[#C6FE56] dark:text-[#12150D] font-bold text-xs shadow-xs"
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    {isKhmer ? "ឆ្លើយតប" : "Reply"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(msg.id)}
                    className="h-8 px-2 rounded-full text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {activeReply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#151B10] border border-[#E2E6D5] dark:border-[#26331B] rounded-[2rem] p-6 sm:p-8 shadow-2xl">
            <h3 className="text-lg font-black text-[#12150D] dark:text-white mb-2">
              {isKhmer ? "ឆ្លើយតបទៅកាន់" : "Reply to"} {activeReply.senderName}
            </h3>
            <p className="text-xs text-[#8E9B7E] mb-4">{activeReply.topic}</p>

            {repliedSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#C6FE56]" />
                {isKhmer ? "បានផ្ញើការឆ្លើយតបរួចរាល់!" : "Reply dispatched to supporter's email!"}
              </div>
            ) : (
              <form onSubmit={handleSendReply} className="space-y-4">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={isKhmer ? "សរសេរការឆ្លើយតប..." : "Type your reply..."}
                  rows={4}
                  required
                  className="w-full p-3.5 rounded-2xl border border-[#E2E6D5] dark:border-[#26331B] bg-[#F8F9F3] dark:bg-[#0D1009] text-xs focus:ring-2 focus:ring-[#C6FE56] outline-hidden text-[#12150D] dark:text-white"
                />
                <div className="flex items-center justify-end gap-2.5">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveReply(null)}
                    className="rounded-full text-xs"
                  >
                    {isKhmer ? "បោះបង់" : "Cancel"}
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-full bg-[#12150D] dark:bg-[#C6FE56] text-[#C6FE56] dark:text-[#12150D] font-bold text-xs px-5"
                  >
                    <Send className="w-3.5 h-3.5 mr-1" />
                    {isKhmer ? "ផ្ញើសារ" : "Send Reply"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
