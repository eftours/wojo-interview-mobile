import { generateRoomCombinations } from "../roomUtils";
import { Room } from "@/app/rooming+api";

describe("generateRoomCombinations", () => {
    const mockRooms: Room[] = [
        { sku: "S", capacity: 1, name: "Single", price: 100, description: "" },
        { sku: "D", capacity: 2, name: "Double", price: 200, description: "" },
    ];

    it("generates correct combinations for 2 travelers", () => {
        const result = generateRoomCombinations(2, mockRooms);

        expect(result).toHaveLength(2);
        expect(result[0].rooms.get("S")).toBe(2); // 2 singles
        expect(result[0].totalPrice).toBe(200);
        expect(result[1].rooms.get("D")).toBe(1); // 1 double
        expect(result[1].totalPrice).toBe(200);
    });

    it("handles edge cases", () => {
        expect(generateRoomCombinations(0, mockRooms)).toHaveLength(1);
        expect(generateRoomCombinations(10, [])).toHaveLength(0);
    });
});
