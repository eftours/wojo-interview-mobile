import { Room } from "@/app/rooming+api";
import { useState, useEffect } from "react";

export const useRooms = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const data = await fetch("/rooming");
                const rooms = await data.json();
                setRooms(rooms);
            } catch (e) {
                setError(e instanceof Error ? e : new Error("Failed to fetch rooms"));
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    return { rooms, loading, error };
};
