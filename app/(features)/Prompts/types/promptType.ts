type Prompt = {
  id: string;
  publicId?: string;
  title: string;
  objective: string;
  score?: number;
  createdAt?: string | Date;
  previewImageUrl?: string | null;
};

export default Prompt;