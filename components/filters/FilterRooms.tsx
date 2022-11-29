import { useEffect, useMemo, useState } from 'react';
import { Level, Room } from '../../libs/store/models/orgs/types';
import useCurrentOrg from '../../libs/store/models/orgs/useCurrentOrg';
import { RoomType } from '../../libs/store/models/roomTypes/types';
import LevelSelector from '../levels/LevelSelector';
import RoomSelector from '../rooms/RoomSelector';
import RoomTypeSelector from '../roomTypes/RoomTypeSelector';

export default function FilterRooms({
  onRoomsChange,
  initialLevel,
  initialRoom,
  initialRoomType,
  setLevel,
  setRoom,
  setRoomType,
}: {
  onRoomsChange: (rooms: Room[]) => void;
  initialLevel?: Level;
  initialRoom?: Room;
  initialRoomType?: RoomType;
  setLevel?: (level?: Level) => void;
  setRoom?: (room?: Room) => void;
  setRoomType?: (roomType?: RoomType) => void;
}) {
  const [level, __setLevel] = useState<Level | undefined>(initialLevel);
  const [room, __setRoom] = useState<Room | undefined>(initialRoom);
  const [roomType, __setRoomType] = useState<RoomType | undefined>(
    initialRoomType
  );

  const {
    levelsInUse,
    roomTypesInUse,
    roomsArray,
    roomsGroupedByLevel,
    roomTypesGroupedByLevel,
  } = useCurrentOrg();

  function _setRoomType(rt?: RoomType) {
    __setRoomType(rt);
    setRoomType?.(rt);
  }

  function _setRoom(r?: Room) {
    __setRoom(r);
    setRoom?.(r);
  }

  function _setLevel(l?: Level) {
    __setLevel(l);
    setLevel?.(l);
    if (!l) return;
    if (roomType) {
      if (!roomTypesGroupedByLevel[l.id].find((rt) => rt.id === roomType.id)) {
        __setRoomType(undefined);
        setRoomType?.(undefined);
      }
    }
    if (room) {
      if (!roomsGroupedByLevel[l.id].find((r) => r.id === room.id)) {
        __setRoom(undefined);
        setRoomType?.(undefined);
      }
    }
  }

  const roomTypeOptions = useMemo(() => {
    return level ? roomTypesGroupedByLevel[level.id] : roomTypesInUse;
  }, [level, roomTypesGroupedByLevel, roomTypesInUse]);

  const roomOptions = useMemo(() => {
    const newOptions = roomsArray.filter((r) => {
      const isInLevel = !!level ? r.level.id === level?.id : true;
      const isInRoomType = !!roomType ? r.roomType.id === roomType.id : true;
      return isInLevel && isInRoomType;
    });
    return newOptions;
  }, [roomsArray, level, roomType]);

  useEffect(() => {
    if (room) onRoomsChange([room]);
    else onRoomsChange(roomOptions);
  }, [onRoomsChange, roomOptions, room]);

  return (
    <div>
      Filter By
      <LevelSelector
        onSelect={_setLevel}
        selected={level}
        levels={levelsInUse}
      />
      <RoomTypeSelector
        selected={roomType}
        onSelect={_setRoomType}
        roomTypes={roomTypeOptions}
      />
      <RoomSelector selected={room} onSelect={_setRoom} rooms={roomOptions} />
      <br />
      <br />
    </div>
  );
}
