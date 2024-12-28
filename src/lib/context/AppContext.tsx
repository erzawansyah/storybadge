"use client";

// Create Context
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Tables } from '../supabase/database.types';
import { storyBadges } from '@/lib/story/config';

export type StoryBadgesType = Tables<'story_badges'>;

interface AppContextType {
    storyBadges: StoryBadgesType[];
}

const defaultValue: AppContextType = {
    storyBadges: [],
};

const AppContext = createContext<AppContextType>(defaultValue);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [badges, setBadges] = useState<StoryBadgesType[]>(defaultValue.storyBadges);


    const fetchBadges = useCallback(async () => {
        try {
            const data = await storyBadges();
            if (data) {
                setBadges(data);
            } else {
                throw new Error('No data available.');
            }
        } catch (error) {
            console.error('Fetch badges error:', error);
        }
    }, []);

    useEffect(() => {
        fetchBadges();
    }, [fetchBadges]);

    const value = useMemo(() => ({
        storyBadges: badges,
    }), [badges]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppContextProvider');
    }
    return context;
}
