import { Room } from "@/app/rooming+api";

export type RoomCombination = {
    rooms: Map<string, number>;
    totalPrice: number;
};

export function generateRoomCombinations(travelers: number, rooms: Room[]): RoomCombination[] {
    const combinations: RoomCombination[] = [];

    function generate(remaining: number, combo: Map<string, number>, startIndex: number) {
        if (remaining === 0) {
            let totalPrice = 0;
            combo.forEach((count, sku) => {
                const room = rooms.find((r) => r.sku === sku);
                if (room) totalPrice += room.price * count;
            });
            combinations.push({ rooms: new Map(combo), totalPrice });
            return;
        }

        for (let i = startIndex; i < rooms.length; i++) {
            const room = rooms[i];
            if (remaining >= room.capacity) {
                combo.set(room.sku, (combo.get(room.sku) || 0) + 1);
                generate(remaining - room.capacity, combo, i);
                combo.set(room.sku, (combo.get(room.sku) || 0) - 1);
            }
        }
    }

    generate(travelers, new Map(), 0);
    return combinations;
}
