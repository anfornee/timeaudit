import { useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Select } from "antd";

import "./App.css";

type FieldType = {
  activity?: string;
  hours?: `${number}`;
};

type ActivityArrayItem = {
  activityName: string;
  activityColor: string;
  label: string;
  hours?: `${number}`;
};

const activitiesArray: ActivityArrayItem[] = [
  { activityName: "youtube", activityColor: "#7A00A8", label: "YouTube" }, // deep neon purple
  { activityName: "videoGame", activityColor: "#005E73", label: "Video Games" }, // dark aqua teal
  { activityName: "phone", activityColor: "#7A003F", label: "Phone" }, // dark magenta-red
  { activityName: "music", activityColor: "#2A007A", label: "Music" }, // deep violet
  { activityName: "work", activityColor: "#006644", label: "Work" }, // dark neon green
  { activityName: "family", activityColor: "#7A5A00", label: "Family" }, // dark gold
  { activityName: "reading", activityColor: "#004F66", label: "Reading" }, // deep cyan
  { activityName: "writing", activityColor: "#7A0000", label: "Writing" }, // dark neon red
  { activityName: "chores", activityColor: "#4A6600", label: "Chores" }, // dark lime-green
  { activityName: "building", activityColor: "#66004F", label: "Building" }, // deep pink‑violet
  { activityName: "friends", activityColor: "#003A7A", label: "Friends" }, // deep electric blue
];

function ActivityList({ activityList }: { activityList: ActivityArrayItem[] }) {
  return (
    <ul className="activity-list">
      {activityList.map((activity, i) => {
        const hoursNumber = parseInt(activity.hours || "");
        const styleObject = {
          background: activity.activityColor,
          height: `${(hoursNumber / 24) * 100}%`,
        };

        const hoursText = hoursNumber
          ? `: ${hoursNumber} hour${hoursNumber == 1 ? "" : "s"}`
          : "";

        return (
          <li
            key={`${activity.activityName}-${i}`}
            style={styleObject}
            className="activity-list-item"
          >
            {activity.label} {hoursText}
          </li>
        );
      })}
    </ul>
  );
}

function ActivityHoursTally({
  activityList,
}: {
  activityList: ActivityArrayItem[];
}) {
  const activityHoursMap = activityList.reduce<
    Record<string, { hours: number; color: string }>
  >((acc, activity) => {
    const label = activity.label;
    const hours = Number(activity.hours ?? 0);

    acc[label] = {
      hours: (acc[label]?.hours ?? 0) + hours,
      color: activity.activityColor,
    };
    return acc;
  }, {});

  const acitivityHoursList = Object.entries(activityHoursMap).map(
    ([label, details]) => ({
      label,
      hours: details.hours,
      color: details.color,
    })
  );

  return (
    <ul className="activity-hours-tally-list">
      <li className="activity-hours-tally-list-item">TOTALS</li>
      {acitivityHoursList.map((activity, i) => (
        <li
          key={`${activity.label}-${i}`}
          style={{ background: activity.color }}
          className="activity-hours-tally-list-item"
        >
          {activity.label} {`: ${activity.hours} hour${activity.hours == 1 ? "" : "s"}`}
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [activtyType, setActivitiyType] = useState<string>("");
  const [activityList, setActivityList] = useState<ActivityArrayItem[]>([]);

  const handleFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const activity = activitiesArray.find(
      (activity) => activity.activityName === values.activity
    );
    if (activity && values.hours) {
      const newActivity = {
        ...activity,
        hours: values.hours,
      };
      setActivityList([...activityList, newActivity]);
    }
  };

  return (
    <main>
      <div className="form-container">
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={handleFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="Activity"
            name="activity"
            rules={[{ required: true }]}
          >
            <Select
              value={activtyType}
              style={{ width: 200 }}
              onChange={(value: string) => setActivitiyType(value)}
              options={activitiesArray.map((activity) => ({
                value: activity.activityName,
                label: activity.label,
              }))}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Hours"
            name="hours"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              style={{ width: 100 }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      {activityList.length ? (
        <div className="activities-lists-container">
          <ActivityHoursTally activityList={activityList} />
          <ActivityList activityList={activityList} />
        </div>
      ) : (
        "No activities added."
      )}
    </main>
  );
}
