-- Fix Damdavy branding to Green Sunsure (for DBs already seeded with 0002/0004/0005)
update public.products set brand = 'Green Sunsure' where brand = 'Damdavy';
update public.products set name = replace(name, 'Damdavy', 'Green Sunsure') where name like '%Damdavy%';
update public.products set short_desc = replace(short_desc, 'Damdavy', 'Green Sunsure') where short_desc like '%Damdavy%';
update public.products set description = replace(description, 'Damdavy', 'Green Sunsure') where description like '%Damdavy%';

update public.posts set author_name = 'Green Sunsure Team' where author_name = 'Damdavy Team';
update public.posts set body = replace(body, 'Damdavy', 'Green Sunsure') where body like '%Damdavy%';
update public.posts set body = replace(body, 'damdavy', 'greensunsure') where body like '%damdavy%';

update public.projects set body = replace(body, 'Damdavy', 'Green Sunsure') where body like '%Damdavy%';
