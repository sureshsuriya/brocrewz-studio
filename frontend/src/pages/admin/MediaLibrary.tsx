import React, { useEffect, useState, useRef } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import axios from 'axios';
import { toast } from 'sonner';
import { UploadCloud, Image as ImageIcon, Film, File as FileIcon, Trash2, Search } from 'lucide-react';
import ImageCropperModal from '../../components/admin/ImageCropperModal';

export default function MediaLibrary() {
  const [category, setCategory] = useState('portfolio');
  const [files, setFiles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['logo', 'team', 'portfolio', 'backgrounds', 'icons', 'videos', 'qr'];

  const fetchFiles = React.useCallback(async () => {
    try {
      const res = await axios.get(`/api/admin/media/${category}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      setFiles(res.data);
    } catch {
      toast.error("Failed to load media files");
    }
  }, [category]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const [cropFile, setCropFile] = useState<File | null>(null);
  const [cropImageUrl, setCropImageUrl] = useState<string>('');

  const getAspectRatio = () => {
    switch (category) {
      case 'team': return 1;
      case 'portfolio': return 16 / 9;
      case 'backgrounds': return 21 / 9;
      case 'qr': return 1;
      default: return undefined; // free crop
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    let selectedFiles;
    if ('dataTransfer' in e) {
      selectedFiles = Array.from(e.dataTransfer.files);
    } else if (e.target instanceof HTMLInputElement && e.target.files) {
      selectedFiles = Array.from(e.target.files);
    } else return;

    if (selectedFiles.length === 0) return;

    const file = selectedFiles[0]; // Process one at a time for cropping

    // If it's a video, upload directly
    if (file.type.startsWith('video/')) {
      uploadFiles([file]);
      return;
    }

    // It's an image, open cropper
    setCropFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setCropImageUrl(reader.result?.toString() || '');
    };
    reader.readAsDataURL(file);
    if(fileInputRef.current) fileInputRef.current.value = '';
  };

  const onCropComplete = (croppedBlob: Blob) => {
    if (!cropFile) return;
    const newFile = new File([croppedBlob], cropFile.name, { type: 'image/jpeg' });
    setCropFile(null);
    setCropImageUrl('');
    uploadFiles([newFile]);
  };

  const uploadFiles = async (filesToUpload: File[]) => {
    setIsUploading(true);
    let successCount = 0;

    for (const file of filesToUpload) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);

      try {
        await axios.post('/api/admin/media/upload', formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        successCount++;
      } catch (err: any) {
        toast.error(`Failed to upload ${file.name}: ${err.response?.data || 'Unknown error'}`);
      }
    }

    if (successCount > 0) {
      toast.success(`Successfully uploaded ${successCount} file(s)`);
      fetchFiles();
    }
    
    setIsUploading(false);
  };

  const deleteFile = async (filename: string) => {
    if(!window.confirm("Are you sure you want to delete this file? This cannot be undone and may break links.")) return;
    try {
      await axios.delete(`/api/admin/media/${category}/${filename}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      toast.success("File deleted");
      fetchFiles();
    } catch {
      toast.error("Failed to delete file");
    }
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext || '')) return <ImageIcon size={24} className="text-blue-400" />;
    if (['mp4', 'webm'].includes(ext || '')) return <Film size={24} className="text-purple-400" />;
    return <FileIcon size={24} className="text-zinc-400" />;
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-wider">Media Library</h2>
          <p className="text-zinc-400 mt-1">Upload and manage images and videos</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Search files..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold"
            />
          </div>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-primary-gold uppercase text-sm tracking-wider font-bold"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={handleFileSelect}
        className={`w-full bg-zinc-900 border-2 border-dashed rounded-xl p-12 text-center mb-8 transition-colors ${isDragging ? 'border-primary-gold bg-primary-gold/5' : 'border-zinc-700 hover:border-zinc-500'}`}
      >
        <UploadCloud size={48} className={`mx-auto mb-4 ${isDragging ? 'text-primary-gold' : 'text-zinc-500'}`} />
        <h3 className="text-lg font-bold text-white mb-2">Drag & Drop files here</h3>
        <p className="text-zinc-400 mb-6 text-sm">Supported formats: JPG, PNG, WEBP, GIF, MP4, WEBM (Max 50MB)</p>
        <input 
          type="file" 
          multiple 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileSelect} 
          accept=".jpg,.jpeg,.png,.webp,.gif,.mp4,.webm"
        />
        <button 
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()} 
          className="bg-primary-gold text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-full hover:bg-yellow-500 disabled:opacity-50"
        >
          {isUploading ? 'Uploading...' : 'Browse Files'}
        </button>
      </div>

      <ImageCropperModal
        isOpen={!!cropFile}
        onClose={() => { setCropFile(null); setCropImageUrl(''); }}
        imageUrl={cropImageUrl}
        aspect={getAspectRatio()}
        onCropComplete={onCropComplete}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredFiles.map((file, idx) => (
          <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden group relative">
            <div className="aspect-square bg-zinc-950 flex items-center justify-center p-2 relative overflow-hidden">
              {file.name.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                <img src={file.url} alt={file.name} className="w-full h-full object-contain" />
              ) : file.name.match(/\.(mp4|webm)$/i) ? (
                <video src={file.url} className="w-full h-full object-contain" />
              ) : (
                getFileIcon(file.name)
              )}
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => window.open(file.url, '_blank')} className="p-2 bg-zinc-800 text-white rounded hover:bg-zinc-700"><Search size={16}/></button>
                <button onClick={() => deleteFile(file.name)} className="p-2 bg-red-500 text-white rounded hover:bg-red-600"><Trash2 size={16}/></button>
              </div>
            </div>
            <div className="p-3 border-t border-zinc-800">
              <p className="text-xs text-zinc-300 font-medium truncate" title={file.name}>{file.name}</p>
              <div className="flex justify-between mt-1">
                <p className="text-[10px] text-zinc-500">{formatSize(file.size)}</p>
                <p className="text-[10px] text-zinc-500">{new Date(file.lastModified).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredFiles.length === 0 && (
        <div className="text-center text-zinc-500 py-12">No files found in this category.</div>
      )}
    </AdminLayout>
  );
}
