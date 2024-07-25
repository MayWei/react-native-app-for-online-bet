import { queryMeetings } from "@/service/meeting";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useLogin } from "@/context/LoginProvider";

import { Body } from "@/components/Fonts/Body";
import { Button } from "@/components/Button/Button";
import { RaceTypeInterface } from "@/types/types";
import { useRacingSelected } from "@/context/RacingSelectedProvider";
import { ClockCounter } from "@/components/clock/Clock";
import Icon from "react-native-vector-icons/FontAwesome";
import { ListSectionHeader } from "@/components/ListSection/ListSectionHeader";
import { ListSectionItem } from "@/components/ListSection/ListSectionItem";
import { ScreenView } from "@/components/screen-view/ScreenView";

export interface RaceInterface {
  typeName: string;
  typeId: number;
  meetings: RaceTypeInterface[];
}

const toSection = (meetings: RaceTypeInterface[]) => {
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
    console.log("meeting seq", meeting.name, meeting.start_time);
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
  return sortedGroups;
};

export default function Homescreen() {
  const { isLoggedin } = useLogin();
  const [sectionData, setSectionData] = useState<RaceInterface[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const { racingSelected, setRacingSelected } = useRacingSelected();
  const [filteredSectionData, setFilteredSectionData] = useState<
    RaceInterface[]
  >([]);
  useEffect(() => {
    console.log(1);
    const queryMeetingsInfo = async () => {
      setIsloading(true);
      const res = await queryMeetings();
      const result = toSection(res.data);
      setSectionData(result);
      console.log("res", result);
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
      <View style={styles.container0}>
        {sectionData.map((section, index) => (
          <Button
            key={index}
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
          <View style={{ marginBottom: 20 }}>
            <ListSectionHeader title={section.typeName} />
            {section.meetings.map((item) => (
              <ListSectionItem
                onPress={() => {}}
                imguri={item.country.flag}
                name={item.name}
                racingNumber={`R${item.races.data[0].race_number}`}
                startTime={item.start_time}
              />
            ))}
          </View>
        ))}
      </ScrollView>
      {/* <View style={styles.container}>
        <Body.B2 semiBold style={{ color: "#fff" }}>
          AAAAAA
        </Body.B2>
      </View>

      <View style={styles.container1}>
        <TouchableOpacity style={styles.touchable}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: "https://serena-prod.s3-ap-southeast-2.amazonaws.com/assets/flags/AU.png",
              }}
              style={styles.avatar}
            />
            <Body.B2 semiBold style={styles.name}>
              name
            </Body.B2>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Body.B3 semiBold style={{ marginRight: 10 }}>
              R1
            </Body.B3>
            <ClockCounter startTime="2024-07-24T10:20:00+00:00"></ClockCounter>
            <Icon name="angle-right" size={24} color="#000" />
          </View>
        </TouchableOpacity>
      </View> */}
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container0: {
    backgroundColor: "#000",
    padding: 18,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  container: {
    borderColor: "#000",
    padding: 12,
    backgroundColor: "#403c3c",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container1: {
    backgroundColor: "#FFF",
    borderBottomColor: "#d9d9d9",
    borderBottomWidth: 2,
    padding: 12,
  },
  touchable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  name: {
    marginLeft: 12,
  },
});
