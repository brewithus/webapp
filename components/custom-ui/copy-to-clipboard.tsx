import { Copy, CopyCheck } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

interface Props {
  text: string;
}
const CopyToClipboard: React.FC<Props> = ({ text }) => {
  const [copied, setCopied] = React.useState(false);
  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!'); // Optionally replace with a more subtle notification
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div
      className="transition-all duration-500 ease-linear"
      onClick={() => {
        copyToClipboard().catch((e) => {});
      }}
    >
      {copied ? <CopyCheck size={16} /> : <Copy size={16} />}
    </div>
  );
};

export default CopyToClipboard;
