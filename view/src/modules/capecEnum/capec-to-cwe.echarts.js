export default {
  tooltip: {
    trigger: "item",
    triggerOn: "mousemove",
  },
  series: [
    {
      type: "tree",
      data: [],
      top: "1%",
      left: "1%",
      bottom: "1%",
      right: "30%",
      symbolSize: 10,
      edgeForkPosition: "30%",
      label: {
        position: "left",
        verticalAlign: "middle",
        align: "left",
        fontSize: 12,
        color: "#FFF",
      },
      leaves: {
        label: {
          position: "right",
          verticalAlign: "middle",
          align: "left",
        },
      },

      expandAndCollapse: true,
      animationDuration: 550,
      animationDurationUpdate: 750,
    },
  ],
};
