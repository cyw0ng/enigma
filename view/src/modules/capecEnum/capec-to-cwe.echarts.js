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
      left: "7%",
      bottom: "1%",
      right: "20%",
      symbolSize: 10,
      edgeForkPosition: "30%",
      label: {
        position: "left",
        verticalAlign: "middle",
        align: "right",
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
