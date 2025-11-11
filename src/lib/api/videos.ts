/**
 * Video API Functions
 * CRUD operations for video management
 */

import { supabase } from '../supabase';

export interface Video {
  id: string;
  title: string;
  description?: string;
  filename?: string;
  url?: string;
  thumbnail_url?: string;
  duration?: string;
  size_bytes?: number;
  status: 'processing' | 'ready' | 'error';
  upload_date: string;
  views: number;
}

export async function uploadVideo(file: File, metadata: Partial<Video>) {
  // Upload file to Supabase Storage
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `videos/${fileName}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('videos')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('videos')
    .getPublicUrl(filePath);

  // Create video record
  const { data, error } = await supabase
    .from('videos')
    .insert([{
      ...metadata,
      filename: fileName,
      url: publicUrl,
      size_bytes: file.size,
      status: 'processing'
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createVideoFromURL(url: string, metadata: Partial<Video>) {
  const { data, error } = await supabase
    .from('videos')
    .insert([{
      ...metadata,
      url,
      status: 'ready'
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getVideos() {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('upload_date', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getVideo(id: string) {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateVideo(id: string, updates: Partial<Video>) {
  const { data, error } = await supabase
    .from('videos')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteVideo(id: string) {
  // Get video to find file path
  const video = await getVideo(id);
  
  // Delete file from storage if it exists
  if (video.filename) {
    await supabase.storage
      .from('videos')
      .remove([`videos/${video.filename}`]);
  }

  // Delete record
  const { error } = await supabase
    .from('videos')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function incrementVideoViews(id: string) {
  const { error } = await supabase.rpc('increment_video_views', { video_id: id });
  if (error) console.error('Error incrementing views:', error);
}
