SELECT 
    topic,
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE difficulty = 'easy') as easy,
    COUNT(*) FILTER (WHERE difficulty = 'medium') as medium,
    COUNT(*) FILTER (WHERE difficulty = 'hard') as hard
FROM questions
GROUP BY topic
ORDER BY topic; 