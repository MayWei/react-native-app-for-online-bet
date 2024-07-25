import { queryMeetings } from "@/service/meeting";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useLogin } from "@/context/LoginProvider";

import { Button } from "@/components/Button/Button";
import { MeetingDetailsInterface, RaceInterface } from "@/types/types";
import { useRacingSelected } from "@/context/RacingSelectedProvider";
import { ListSectionHeader } from "@/components/ListSection/ListSectionHeader";
import { ListSectionItem } from "@/components/ListSection/ListSectionItem";
import { ScreenView } from "@/components/screen-view/ScreenView";
import Modal from "react-native-modal";
import { toSection } from "@/utils/utils";
import { MeetingSectionHeader } from "@/components/MeetingSection/MeetingSectionHeader";
import { MeetingSubHeader } from "@/components/MeetingSection/MeetingSubHeader";
import { MeetingSectionItem } from "@/components/MeetingSection/MeetingSectionItem";

export default function Homescreen() {
  const { isLoggedin } = useLogin();
  const [sectionData, setSectionData] = useState<RaceInterface[]>([]);
  const [sortedMeetingsData, setSortedMeetingsData] = useState<
    MeetingDetailsInterface[]
  >([]);
  const [activeMeeting, setActiveMeeting] =
    useState<MeetingDetailsInterface | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const { racingSelected, setRacingSelected } = useRacingSelected();
  const [filteredSectionData, setFilteredSectionData] = useState<
    RaceInterface[]
  >([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log(1);
    const queryMeetingsInfo = async () => {
      setIsloading(true);
      const res = await queryMeetings();
      const { sortedGroups, sortedMeetings } = toSection(res.data);
      setSectionData(sortedGroups);
      setSortedMeetingsData(sortedMeetings);
      console.log("res", sortedGroups);
      setIsloading(false);
    };
    console.log("isLoggedin", isLoggedin);
    if (isLoggedin) queryMeetingsInfo();
  }, [isLoggedin]);
  useEffect(() => {
    console.log("sectionData", sectionData);
    if (sectionData.length > 0 && racingSelected == null) {
      const newRace: { [racingType: string]: boolean } = {};
      sectionData.forEach((section) =>
        Object.assign(newRace, { [section.typeName]: true })
      );
      setRacingSelected(newRace);
    }
  }, [sectionData]);
  useEffect(() => {
    if (racingSelected !== null && sectionData.length !== 0 && !isLoading) {
      setFilteredSectionData(
        sectionData.filter((sec) => racingSelected![sec.typeName])
      );
    }
  }, [racingSelected, sectionData, isLoading]);
  useEffect(() => {
    console.log("buttonState", racingSelected);
  }, [racingSelected]);
  return sectionData.length == 0 ||
    isLoading ||
    filteredSectionData.length === 0 ? (
    <Text>Loading</Text>
  ) : (
    <ScreenView>
      <View style={styles.container}>
        {sectionData.map((section, index) => (
          <Button
            key={section.typeId}
            label={section.typeName}
            selected={!!racingSelected && racingSelected[section.typeName]}
            onPress={() => setRacingSelected(section.typeName)}
            style={{
              backgroundColor:
                racingSelected && racingSelected[section.typeName]
                  ? "#60f483"
                  : "#403c3c",
            }}
          />
        ))}
      </View>

      <ScrollView keyboardShouldPersistTaps="handled">
        {filteredSectionData.map((section, index) => (
          <View style={{ marginBottom: 20 }} key={section.typeId}>
            <ListSectionHeader title={section.typeName} />
            {section.meetings.map((item) => (
              <ListSectionItem
                onPress={() => {
                  const activeMeeting = sortedMeetingsData.find(
                    (meeting) => meeting.id === item.id
                  );
                  activeMeeting && setActiveMeeting(activeMeeting);
                  activeMeeting && setIsVisible(true);
                }}
                imguri={item.country.flag}
                name={item.name}
                racingNumber={`R${item.races.data[0].race_number}`}
                startTime={item.start_time}
                key={item.id}
              />
            ))}
          </View>
        ))}
      </ScrollView>
      <Modal
        isVisible={isVisible}
        animationIn="slideInRight"
        animationOut="slideOutRight"
      >
        <MeetingSectionHeader onPress={() => setIsVisible(false)} />
        <ListSectionItem
          onPress={() => {}}
          imguri={activeMeeting ? activeMeeting.country.flag : ""}
          name={activeMeeting ? activeMeeting.name : ""}
          racingNumber={`R${
            activeMeeting ? activeMeeting.races.data[0].race_number : ""
          }`}
          startTime={activeMeeting ? activeMeeting.start_time : ""}
          key={activeMeeting ? activeMeeting.id : ""}
          isFirst
        />
        <MeetingSubHeader
          distance={activeMeeting ? activeMeeting.distance : 0}
          condition={activeMeeting ? activeMeeting.weather : ""}
          track={activeMeeting ? activeMeeting.track.condition : ""}
        />
        {activeMeeting
          ? activeMeeting.races.data.map((race) => (
              <MeetingSectionItem
                name={race.name}
                racingNumber={`R${race.race_number}`}
                startTime={race.start_time}
              />
            ))
          : null}
      </Modal>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
