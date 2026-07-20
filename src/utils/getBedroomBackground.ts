export interface RoomState {
  desk: boolean;
  bed: boolean;
  painting: boolean;
  wardrobe: boolean;
}

export function getBedroomBackground(roomState: RoomState) {
  const state =
    `${Number(roomState.desk)}` +
    `${Number(roomState.bed)}` +
    `${Number(roomState.painting)}` +
    `${Number(roomState.wardrobe)}`;

  return `/backgrounds/room/bedroom_${state}.png`;
}
