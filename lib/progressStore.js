import { supabase } from './supabaseClient';
import { DEFAULT_PROGRESS } from './engine';

export async function loadProgress(userId) {
  const { data, error } = await supabase
    .from('progress')
    .select('data')
    .eq('user_id', userId)
    .maybeSingle();
  if (error || !data || !data.data) {
    return JSON.parse(JSON.stringify(DEFAULT_PROGRESS));
  }
  return data.data;
}

export async function saveProgress(userId, progress) {
  const { error } = await supabase
    .from('progress')
    .upsert({ user_id: userId, data: progress, updated_at: new Date().toISOString() });
  return !error;
}
