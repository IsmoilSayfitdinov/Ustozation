import { useState } from 'react';
import { Edit, Trash2, CheckCircle2, Play, X, Save, Upload } from 'lucide-react';

interface AnswerOption {
  id: number;
  text: string;
  is_correct?: boolean;
  order: number;
}

interface MediaItem {
  id: number;
  file: string;
  media_type: 'image' | 'audio' | 'video';
}

interface QuestionCardProps {
  number: number;
  questionId: number;
  category: string;
  question: string;
  answers: AnswerOption[];
  media: MediaItem[];
  onDelete?: () => void;
  onEditQuestion?: (questionId: number, data: { text?: string; order?: number; points?: number; penalty?: number }) => void;
  onUpdateAnswers?: (questionId: number, answers: { text: string; is_correct: boolean; order: number }[]) => void;
  onUploadMedia?: (questionId: number, file: File, mediaType: string) => void;
  onDeleteMedia?: (mediaId: number) => void;
  isEditing?: boolean;
}

const QuestionCard = ({
  number, questionId, category, question, answers, media,
  onDelete, onEditQuestion, onUpdateAnswers, onUploadMedia, onDeleteMedia,
}: QuestionCardProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editText, setEditText] = useState(question);
  const [editAnswers, setEditAnswers] = useState(
    answers.map(a => ({ text: a.text, is_correct: a.is_correct ?? false, order: a.order }))
  );

  const handleSaveQuestion = () => {
    onEditQuestion?.(questionId, { text: editText, order: number });
    if (onUpdateAnswers) {
      onUpdateAnswers(questionId, editAnswers);
    }
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditText(question);
    setEditAnswers(answers.map(a => ({ text: a.text, is_correct: a.is_correct ?? false, order: a.order })));
    setIsEditMode(false);
  };

  const firstMedia = media?.[0];

  return (
    <div className="bg-white rounded-[28px] border border-[#F2F4F7] overflow-hidden group hover:shadow-xl transition-all duration-300">
      {/* Media Section */}
      {firstMedia && !isEditMode && (
        <div className="relative h-44 overflow-hidden bg-[#F9FAFB]">
          {firstMedia.media_type === 'video' ? (
            <div className="relative h-full w-full bg-black">
              <video src={firstMedia.file} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
            </div>
          ) : firstMedia.media_type === 'audio' ? (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 p-6">
              <audio controls src={firstMedia.file} className="w-full" />
            </div>
          ) : (
            <img src={firstMedia.file} alt="" className="w-full h-full object-cover" />
          )}

          {/* Media delete button */}
          {onDeleteMedia && (
            <button
              onClick={() => onDeleteMedia(firstMedia.id)}
              className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm text-white hover:bg-[#F04438] flex items-center justify-center transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-black text-sm shadow-md shadow-primary/20">
              {number}
            </div>
            <span className="px-2.5 py-1 bg-[#EEF4FF] text-[#3538CD] text-[10px] font-black uppercase tracking-widest rounded-lg">
              {category}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {!isEditMode ? (
              <>
                {onEditQuestion && (
                  <button onClick={() => setIsEditMode(true)} className="p-2 rounded-xl hover:bg-primary/10 text-[#98A2B3] hover:text-primary transition-all" title="Tahrirlash">
                    <Edit className="w-4 h-4" />
                  </button>
                )}
                {onDelete && (
                  <button onClick={onDelete} className="p-2 rounded-xl hover:bg-[#FEE4E2] text-[#98A2B3] hover:text-[#F04438] transition-all" title="O'chirish">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </>
            ) : (
              <>
                <button onClick={handleSaveQuestion} className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all" title="Saqlash">
                  <Save className="w-4 h-4" />
                </button>
                <button onClick={handleCancel} className="p-2 rounded-xl hover:bg-[#F2F4F7] text-[#98A2B3] transition-all" title="Bekor qilish">
                  <X className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Question Text */}
        {isEditMode ? (
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E4E7EC] rounded-xl text-sm font-bold text-[#1D2939] outline-none focus:border-primary/30 min-h-[80px] resize-none"
          />
        ) : (
          <h4 className="text-base font-black text-[#1D2939] leading-snug">"{question}"</h4>
        )}

        {/* Answers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {isEditMode ? (
            editAnswers.map((ans, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditAnswers(prev => prev.map((a, i) => ({ ...a, is_correct: i === idx })));
                  }}
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    ans.is_correct ? 'bg-[#22C55E] border-[#22C55E] text-white' : 'border-[#E4E7EC] hover:border-[#22C55E]/50'
                  }`}
                >
                  {ans.is_correct && <CheckCircle2 className="w-4 h-4" />}
                </button>
                <input
                  value={ans.text}
                  onChange={(e) => {
                    const updated = [...editAnswers];
                    updated[idx] = { ...updated[idx], text: e.target.value };
                    setEditAnswers(updated);
                  }}
                  className="flex-1 px-3 py-2 bg-[#F9FAFB] border border-[#E4E7EC] rounded-lg text-sm font-medium outline-none focus:border-primary/30"
                />
              </div>
            ))
          ) : (
            answers.map((opt, idx) => (
              <div
                key={opt.id}
                className={`p-3 rounded-xl border flex items-center justify-between ${
                  opt.is_correct
                    ? 'bg-[#ECFDF3] border-[#22C55E]/30 text-[#22C55E]'
                    : 'bg-[#F9FAFB] border-[#F2F4F7] text-[#667085]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] font-black opacity-50">{String.fromCharCode(65 + idx)}</span>
                  <span className="text-sm font-bold">{opt.text}</span>
                </div>
                {opt.is_correct && <CheckCircle2 className="w-4 h-4 shrink-0" />}
              </div>
            ))
          )}
        </div>

        {/* Media upload in edit mode */}
        {isEditMode && onUploadMedia && (
          <div className="pt-2">
            <label className="flex items-center gap-2 px-4 py-2.5 bg-[#F9FAFB] border border-dashed border-[#D0D5DD] rounded-xl cursor-pointer hover:border-primary/30 transition-colors">
              <Upload className="w-4 h-4 text-[#98A2B3]" />
              <span className="text-xs font-bold text-[#98A2B3]">Media qo'shish (rasm, audio, video)</span>
              <input
                type="file"
                accept="image/*,audio/*,video/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const type = file.type.startsWith('image') ? 'image' : file.type.startsWith('audio') ? 'audio' : 'video';
                    onUploadMedia(questionId, file, type);
                  }
                }}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
