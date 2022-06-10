import { useQuery } from "react-query";
import { useMatch, useLocation, useParams, Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { fetchCoinInfo } from "../api";
import { fetchCoinTickers } from './../api';

const Container = styled.div`
    padding: 0 20px;
    max-width: 500px;
    margin: 0 auto;
`;
const Header = styled.div`
    position: relative;
    height: 10vh;
    min-height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const BackButton = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    background-color: ${(props) => props.theme.bgColor};
    border: 1px solid ${(props) => props.theme.boxColor};
    color: ${(props) => props.theme.boxColor};
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    font-weight: 900;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
`;
const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
    color: ${props => props.theme.boxColor};
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.overviewBgColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  color: ${props => props.theme.boxColor};
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${props => props.theme.overviewBgColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

type Params = {
    coinId: string;
}
interface ILocation {
    state:{
        name:string;
    };
}
interface IInfodata {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}
interface IPricedata {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            price: number;
            volume_24h:     number;
            volume_24h_change_24h:     number;
            market_cap:     number;
            market_cap_change_24h:     number;
            percent_change_15m:     number;
            percent_change_30m:     number;
            percent_change_1h:     number;
            percent_change_6h:     number;
            percent_change_12h:     number;
            percent_change_24h:     number;
            percent_change_7d:     number;
            percent_change_30d:     number;
            percent_change_1y:     number;
            ath_price:     number;
            ath_date:     string;
            percent_from_price_ath:     number;
        }
    };
}

function Coin() {
    const {coinId} = useParams<Params>();
    const {state} = useLocation() as ILocation;
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    const {isLoading: infoLoading, data: infoData} = useQuery<IInfodata>(
        ["info", coinId], 
        () => fetchCoinInfo(coinId!),
    );
    const {isLoading: tickersLoading, data: tickersData} = useQuery<IPricedata>(
        ["tickers", coinId], 
        () => fetchCoinTickers(coinId!),
        {
            refetchInterval: 5000,
        }
    );

    // const [info, setInfo] = useState<IInfodata>();
    // const [priceInfo, setPriceInfo] = useState<IPricedata>();
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     (async () => {
    //         const infoData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    //         ).json();
    //         const priceData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    //         ).json();

    //         setInfo(infoData);
    //         setPriceInfo(priceData);
    //         setLoading(false);
    //     })();
    // }, [coinId]);
    
    const loading = infoLoading || tickersLoading;
    return (
        <Container>
            <HelmetProvider>
                <Helmet>
                    <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
                </Helmet>
            </HelmetProvider>
            <Header>
                <BackButton>
                    <Link to="/">&larr;</Link>
                </BackButton>
                <Title>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </Title>
            </Header>
            {loading ? (
                <Loader>"Loading..."</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                        <span>Rank:</span>
                        <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                        <span>Symbol:</span>
                        <span>${infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                        <span>Price:</span>
                        <span>{tickersData?.quotes?.USD.price.toFixed(3)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                        <span>Total Suply:</span>
                        <span>{tickersData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                        <span>Max Supply:</span>
                        <span>{tickersData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>

                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                    </Tabs>

                    <Outlet context={{ coinId, tickersData }}/>
                </>
            )}
        </Container>
    );
}

export default Coin;