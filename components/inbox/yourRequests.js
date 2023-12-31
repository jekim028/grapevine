import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { padding } from "../../styles/spacing";
import { colors } from "../../styles/colors";
import { ProfilePic, ProfileWithDegreeAndTimestamp } from "../general/Profiles";
import {
  TextLgSecondaryBold,
  TextMedPrimary,
  TextMedPrimaryBold,
  TextSmSecondary,
  TextSmSecondaryBold,
  TextMedSecondary,
} from "../general/Text";
import { BusinessShortcut } from "../businessProfiles/BusinessShortcut";
import { InvertedButton, AccentButton } from "../general/Button";
import { PartialLine } from "../general/Line";
import { useAuth } from "../../utils/AuthProvider";
import { supabase } from "../../utils/supabase";
import { convertTimestampFromIso } from "../functions/convertTimestampFromIso";
import Toast from "react-native-toast-message";
import { SmallPrivacySetter } from "../creating/PrivacySetter";
import { PrivacyModal } from "../../components/creating/PrivacyModal";

function showSuccessToast(text) {
  Toast.show({
    type: "success",
    props: { text: text },
  });
}

const RequestButtons = ({ text1, text2, id }) => {
  const removeRequest = async () => {
    const { error } = await supabase.from("requests").delete().eq("id", id);

    if (error) {
      console.log("Error removing request:", error);
    }
  };

  return (
    <View style={styles.rowContainerMed}>
      <TouchableOpacity
        onPress={() => {
          showSuccessToast("Request Cancelled"), removeRequest();
        }}
        style={{ flex: 1 }}
      >
        <InvertedButton text={text1} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => showSuccessToast("Request Resent")}
        style={{ flex: 1 }}
      >
        <AccentButton text={text2} />
      </TouchableOpacity>
    </View>
  );
};

const PendingRequest = ({
  requestType,
  timestamp,
  requestText,
  id,
  isPublic,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPublicState, setIsPublicState] = useState(isPublic);
  //need to add function to change isPublic based on PrivacySetter but just have this for now
  const { profile } = useAuth();
  return (
    <>
      <View style={styles.pendingRequest}>
        <View style={styles.rowContainerMed}>
          <ProfilePic size={32} uri={profile.avatar_url} />
          <View style={styles.colContainerSm}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "flex-start",
              }}
            >
              <View style={styles.colContainerXxs}>
                <View style={styles.rowContainerXsWrap}>
                  <TextMedPrimary text={"You requested a"} />
                  <TextMedPrimaryBold text={requestType} />
                </View>
                <TextSmSecondary text={convertTimestampFromIso(timestamp)} />
              </View>
              <SmallPrivacySetter
                setter={setModalVisible}
                isPublic={isPublicState}
              />
            </View>
            <Text style={{ flexWrap: "wrap" }}>{requestText}</Text>
          </View>
        </View>
        <RequestButtons text1={"Cancel"} text2={"Resend"} id={id} />
      </View>
      <PrivacyModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        publicSetter={setIsPublicState}
      />
    </>
  );
};

const PendingRequestsSection = ({ data }) => {
  const { profile } = useAuth();

  return (
    <View>
      <TextLgSecondaryBold text={"Your Pending Requests"} />
      {data.length == 0 && (
        <View style={{ padding: padding.med }}>
          <TextMedSecondary text={"No pending requests"} />
        </View>
      )}
      {data.length != 0 && (
        <View style={{ gap: 1, backgroundColor: colors.gray }}>
          {data.map((item) => (
            <PendingRequest
              requestType={item.category}
              timestamp={item.created_at}
              requestText={item.message}
              id={item.id}
              key={item.id}
              isPublic={item.isPublic}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const CompletedRequest = ({ requestType, requestTimestamp, responseData }) => {
  const { profile } = useAuth();
  const [isShowingAllResponses, setIsShowingAllResponses] = useState(false);
  const toggleShow = () => {
    setIsShowingAllResponses((prevState) => !prevState);
  };

  return (
    <View style={styles.pendingRequest}>
      <View style={styles.rowContainerMed}>
        <ProfilePic size={32} uri={profile.avatar_url} />
        <View style={styles.colContainerXxs}>
          <View style={styles.rowContainerXsWrap}>
            <TextMedPrimary text={"Your"} />
            <TextMedPrimaryBold text={requestType} />
            <TextMedPrimary text={"request"} />
          </View>
          <TextSmSecondary text={requestTimestamp} />
        </View>
      </View>
      <View style={styles.rowContainerMed}>
        <PartialLine width={32} />
        <TouchableOpacity onPress={toggleShow}>
          {isShowingAllResponses && (
            <TextSmSecondaryBold text={"Hide responses"} />
          )}
          {!isShowingAllResponses && (
            <TextSmSecondaryBold
              text={`View ${responseData.length - 1} other responses`}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={{ paddingLeft: 32, gap: 24 }}>
        {isShowingAllResponses &&
          responseData.map((item) => (
            <RequestResponse item={item} key={item.name} />
          ))}
        {!isShowingAllResponses && (
          <RequestResponse
            item={responseData[responseData.length - 1]}
            key={responseData[responseData.length - 1].name}
          />
        )}
      </View>
    </View>
  );
};

const RequestResponse = (props) => {
  const {
    personPic,
    name,
    degree,
    timestamp,
    businessName,
    numRecommendations,
    businessType,
  } = props.item;
  return (
    <View style={styles.colContainerMed}>
      <View style={styles.colContainerMed}></View>
      <BusinessShortcut
        businessName={businessName}
        numRecommendations={numRecommendations}
        businessType={businessType}
      />
    </View>
  );
};

const CompletedRequestsSection = ({ data }) => {
  return (
    <View>
      <TextLgSecondaryBold text={"Your Completed Requests"} />
      <View style={{ gap: 1, backgroundColor: colors.gray }}>
        {data.map((item) => (
          <CompletedRequest
            requestType={item.requestType}
            requestTimestamp={item.requestTimestamp}
            responseData={item.responseData}
            key={item.requestType}
          />
        ))}
      </View>
    </View>
  );
};

export const YourRequestsSection = ({
  yourCompletedRequestsData,
  yourPendingRequestsData,
  setYourRequests,
}) => {
  useEffect(() => {
    const getResponses = async () => {
      const { data, error } = await supabase
        .from("request-responses")
        .select("request_id, rec_id");

      console.log(data, error);
      // If one of your request ids is in the response table, then request should be moved to completed
    };
    getResponses();
  }, []);

  return (
    <View style={styles.colContainerMed}>
      <PendingRequestsSection data={yourPendingRequestsData} />
      <CompletedRequestsSection data={yourCompletedRequestsData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "start",
    justifyContent: "start",
  },
  header: {
    padding: padding.med,
  },
  hasMargin: {
    paddingHorizontal: padding.med,
  },
  toggle: {
    flexDirection: "row",
    backgroundColor: colors.gray,
    height: 54,
    borderRadius: padding.lg,
  },
  rowContainerXs: {
    flexDirection: "row",
    gap: padding.xs,
    alignItems: "center",
    backgroundColor: "red",
  },
  rowContainerXsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: padding.xs,
    alignItems: "center",
    flexShrink: 1,
  },
  rowContainerSm: {
    flexDirection: "row",
    gap: padding.sm,
    alignItems: "center",
    flexShrink: 1,
  },
  rowContainerMed: {
    flexDirection: "row",
    gap: padding.med,
    flexShrink: 1,
    alignItems: "start",
    flexShrink: 1,
  },
  colContainerSm: {
    flexDirection: "col",
    gap: padding.sm,
    flexShrink: 1,
  },
  colContainerXs: {
    flexDirection: "col",
    gap: padding.xs,
    flexShrink: 1,
  },
  colContainerXxs: {
    flexDirection: "col",
    gap: padding.xxs,
    flexShrink: 1,
  },
  colContainerXsWrap: {
    flexDirection: "col",
    gap: padding.xs,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  colContainerMed: {
    flexDirection: "col",
    gap: padding.med,
    flexShrink: 1,
  },
  pendingRequest: {
    paddingVertical: padding.lg,
    gap: padding.med,
    backgroundColor: "white",
  },
});
