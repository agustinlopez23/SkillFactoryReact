import {
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  NumberOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import millify from "millify";
export const time = ["07", "30", "60", "90", "360", "720"];

export function Ss(cryptoDetail) {
  return {
    stats: [
      {
        title: "Price to USD",
        value: `$ ${
          cryptoDetail?.data?.market_data.current_price.usd &&
          millify(cryptoDetail?.data?.market_data.current_price.usd)
        }`,
        icon: <DollarCircleOutlined />,
      },
      {
        title: "Rank",
        value: cryptoDetail?.data?.market_cap_rank,
        icon: <NumberOutlined />,
      },
      {
        title: "24h Volume",
        value: `$ ${
          cryptoDetail?.data?.market_data.total_volume.usd &&
          millify(cryptoDetail?.data?.market_data.total_volume.usd)
        }`,
        icon: <ThunderboltOutlined />,
      },
      {
        title: "Market Cap",
        value: `$ ${
          cryptoDetail?.data?.market_data?.market_cap?.usd &&
          millify(cryptoDetail?.data?.market_data?.market_cap?.usd)
        }`,
        icon: <DollarCircleOutlined />,
      },
      {
        title: "All-time-high(daily avg.)",
        value: `$ ${millify(cryptoDetail?.data?.market_data.ath.usd)}`,
        icon: <TrophyOutlined />,
      },
    ],
  };
}
export function gS(cryptoDetail) {
  return {
    genericStats: [
      //  { title: 'Number Of Markets', value: cryptoDetail?.data?.numberOfMarkets, icon: <FundOutlined /> },
      //  { title: 'Number Of Exchanges', value: cryptoDetail?.data?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
      //  { title: 'Aprroved Supply', value: cryptoDetail?.data?.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
      {
        title: "Total Supply",
        value: `$ ${millify(cryptoDetail?.data?.market_data.total_supply)}`,
        icon: <ExclamationCircleOutlined />,
      },
      {
        title: "Circulating Supply",
        value: `$ ${millify(
          cryptoDetail?.data?.market_data.circulating_supply
        )}`,
        icon: <ExclamationCircleOutlined />,
      },
    ],
  };
}
