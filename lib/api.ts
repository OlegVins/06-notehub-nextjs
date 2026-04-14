'use client'

import axios, { type AxiosResponse } from 'axios';
import type { Note, NoteTag } from '../types/note';
import { log } from 'console';
import { config } from 'process';

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export interface CreateNoteRequest {
    title: string;
    content: string;
    tag: NoteTag;
}

const BASE_URL = 'https://notehub-public.goit.study/api';

const instance = axios.create({
    baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
    const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn("Warning: NEXT_PUBLIC_NOTEHUB_TOKEN not fined!");
    }
    return config;
})


export const fetchNotes = async (
    page: number,
    search: string
): Promise<FetchNotesResponse> => {
    const response:
        AxiosResponse<FetchNotesResponse> = await instance.get('/notes', {
        params: {
            page,
            perPage: 12,
            search,
        },
    });
    return response.data;
};

export const createNote = async (
    note: CreateNoteRequest
): Promise<Note> => {
    const response: AxiosResponse<Note> = await instance.post('/notes',
        note
    );
    return response.data;
};

export const deleteNote = async (
    id: string
): Promise<Note> => {
    const response: AxiosResponse<Note> = await instance.delete(`/notes/${id}`
    );
    return response.data;
};
    
export const fetchNoteById = async (
    id: string
): Promise<Note> => {
        const response: AxiosResponse<Note> = await instance.get(`/notes/${id}`

        );
        return response.data;
};