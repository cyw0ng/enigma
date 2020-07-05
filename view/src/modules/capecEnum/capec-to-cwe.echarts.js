export default {
  title: {
    text: "CAPEC to CWE",
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      name: "Fig Tree",
      type: "tree",
      orient: "horizontal",
      rootLocation: { x: 100, y: "center" },
      nodePadding: 8,
      layerPadding: 200,
      hoverable: false,
      roam: true,
      symbolSize: 6,
      itemStyle: {
        normal: {
          color: "#4883b4",
          label: {
            show: true,
            position: "right",
            formatter: "{b}",
            textStyle: {
              color: "#000",
              fontSize: 12,
            },
          },
          lineStyle: {
            color: "#ccc",
            type: "curve",
          },
        },
        emphasis: {
          color: "#4883b4",
          label: {
            show: false,
          },
          borderWidth: 0,
        },
      },
      data: [],
    },
  ],
};
