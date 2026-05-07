-- Supabaseのダッシュボード > SQL Editor で実行済み
-- 一応記録のため

create table emotions (
  id bigint generated always as identity primary key,
  emotion text not null,
  intensity int not null check (intensity between 1 and 10),
  trigger text,
  memo text,
  created_at timestamptz default now()
);
