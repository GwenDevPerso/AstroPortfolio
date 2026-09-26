export type SkillGroupId = 'languages' | 'frameworks' | 'databases' | 'devops';

export type SkillGroup = {
    id: SkillGroupId;
    skills: string[];
};

export const skillGroups: SkillGroup[] = [
    {
        id: 'languages',
        skills: ['TypeScript', 'Python', 'Java', 'C', 'C++', 'HTML', 'CSS'],
    },
    {
        id: 'frameworks',
        skills: ['React', 'React Native', 'Angular', 'Vue', 'Next', 'Nest', 'NodeJS', 'FastAPI', 'Ionic', 'GraphQL', 'Web3'],
    },
    {
        id: 'databases',
        skills: ['Postgres', 'MySQL', 'MongoDB', 'Elasticsearch', 'Supabase'],
    },
    {
        id: 'devops',
        skills: ['Docker', 'AWS', 'GCP', 'Git', 'Github', 'Github Actions', 'Gitlab', 'Jenkins'],
    },
];
