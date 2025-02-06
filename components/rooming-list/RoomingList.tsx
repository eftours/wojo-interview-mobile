import pluralize from "pluralize";
import { StyleSheet, Text, View } from "react-native";
import { useMemo } from "react";
import { RadioGroup } from "@/ui";
import { useRooms } from "@/hooks";
import { generateRoomCombinations } from "./roomUtils";

export interface RoomingListProps {
    nbTravelers: number;
    selectedId?: string;
    setSelection: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const RoomingList: React.FC<RoomingListProps> = ({ nbTravelers, selectedId, setSelection }) => {
    const { rooms, loading, error } = useRooms();

    const items = useMemo(() => {
        if (!rooms?.length) return [];

        return generateRoomCombinations(nbTravelers, rooms).map((combo) => {
            const label = Array.from(combo.rooms.entries())
                .map(([sku, count]) => {
                    const room = rooms.find((r) => r.sku === sku);
                    return room ? `${count} ${room.name} ${pluralize("room", count)}` : "";
                })
                .filter(Boolean)
                .join(", ");

            return {
                id: label,
                label: `${label} (Total: $${combo.totalPrice})`,
                value: label,
            };
        });
    }, [nbTravelers, rooms]);

    if (error) return <Text>Error: {error.message}</Text>;
    if (loading) return <Text>Loading...</Text>;
    if (!items.length) {
        return <Text>No room combinations available</Text>;
    }

    return (
        <View testID="rooming-list" style={styles.container}>
            <RadioGroup
                items={items}
                selectedId={selectedId}
                onChange={setSelection}
                labelText={`Available combinations for ${nbTravelers} ${pluralize("traveler", nbTravelers)}`}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
});
