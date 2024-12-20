import { MeetingDetailsInterface, RaceTypeInterface } from "@/types/types";

/**
 * this is process meeting API data, return { sortedGroups, sortedMeetings } to be used
 * in dashboard page and meeting page(implemented as a Modal in this project)
 */

export const toSection = (meetings: RaceTypeInterface[]) => {
  const groupedByRaceType = meetings.reduce<
    Record<
      string,
      {
        typeId: number;
        meetings: RaceTypeInterface[];
      }
    >
  >((acc, meeting) => {
    const raceTypeName = meeting.race_type.name;
    const raceTypetypeId = meeting.race_type.id;
    if (!acc[raceTypeName]) {
      acc[raceTypeName] = {
        typeId: raceTypetypeId,
        meetings: [],
      };
    }
    acc[raceTypeName].meetings.push(meeting);
    return acc;
  }, {});
  const sortedGroups = Object.keys(groupedByRaceType)
    .map((key) => ({
      typeName: key,
      typeId: groupedByRaceType[key].typeId,
      meetings: groupedByRaceType[key].meetings,
    }))
    .sort((a, b) => a.typeId - b.typeId);
  sortedGroups.forEach((group) =>
    group.meetings.sort(
      (a, b) =>
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
    )
  );
  const sortedMeetings = sortedGroups.reduce<MeetingDetailsInterface[]>(
    (acc, curr) => {
      const temp = curr.meetings.map(
        ({ id, name, start_time, races, weather, track, country }) => ({
          id,
          name,
          start_time,
          races,
          weather,
          track,
          country,
          r_number: races.data[0].race_number,
          distance: races.data[0].distance,
        })
      );
      acc.push(...temp);
      return acc;
    },
    []
  );

  return { sortedGroups, sortedMeetings };
};
