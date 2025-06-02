"use client"
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useCompletion, experimental_useObject as useObject } from '@ai-sdk/react';
import { schema } from "@/lib/schema";

export default function Home() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);


  const { object, error, submit, isLoading } = useObject({
    api: '/api/generate-script',
    schema,
  });

  const handleSend = async () => {
    if (!input.trim()) return;
    try {
      await submit({ messages: input });
      setInput("");
      if (inputRef.current) {
        inputRef.current.innerText = "";
      }
    } catch (error) {
      console.log("Error submitting CV:", error);
    }
  }




  return (
    <div className="w-full h-screen flex flex-col relative">
      <div>
        {object && (
          <div className="max-w-3xl mx-auto px-4 py-6">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-gray-800 rounded-2xl p-4 mb-4">
                <h2 className="text-xl font-bold text-gray-200">Generated Script</h2>
                <div className="mt-2 text-gray-300">
                  <p><strong>Intro:</strong> {object.script?.intro}</p>
                  <p><strong>Description:</strong> {object.script?.description}</p>
                  <p><strong>Outro:</strong> {object.script?.outro}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full absolute bg-gray-950 pb-4 pt-2 bottom-0 mt-auto">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            animate={{ height: "auto" }}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="relative bg-gray-800  rounded-2xl lg:rounded-e-3xl p-2.5 flex items-end gap-2">
            <div
              contentEditable
              role="textbox"
              onInput={(e) => {
                setInput(e.currentTarget.textContent || "")
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              data-placeholder="Create a script..."
              className="flex-1 text-gray-200 bg-gray-800 min-h-[36px] overflow-y-auto px-3 py-2 focus:outline-none 
                        text-sm rounded-md empty:before:text-gray-300 empty:before:content-[attr(data-placeholder)] whitespace-pre-wrap break-words"
              ref={inputRef}
            />
            <button onClick={() => handleSend()} className="rounded-full shrink-0 mb-0.5 p-1 bg-black text-white">
              <ArrowUpIcon strokeWidth={2.5} className="size-5" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
