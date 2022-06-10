import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import SwitchButton from "../components/ThemeSwitchButton";

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

    label {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: ${props => props.theme.boxColor};
    color: ${props => props.theme.bgColor};
    margin-bottom: 10px;
    border-radius: 20px;
    a {
        display: flex;
        align-items: center;
        transition: color .2s ease-in;
        padding: 20px;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor};
        }
    }
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

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins() {
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
    
    // const [coins, setCoins] = useState<ICoin[]>([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     (async () => {
    //         const res = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await res.json();
    //         setCoins(json.slice(0, 100));
    //         setLoading(false);
    //     })();
    // }, []);

    return (
        <Container>
            <HelmetProvider>
                <Helmet>
                    <title>코인</title>
                </Helmet>
            </HelmetProvider>
            <Header>
                <Title>코인</Title>
                <SwitchButton />
            </Header>
            {isLoading ? (
                <Loader>"Loading..."</Loader>
            ) : (
            <CoinsList>
                {data?.slice(0, 100).map(coin => (
                    <Coin key={coin.id}>
                        <Link to={`/${coin.id}/chart`} state={{name: coin.name}}>
                            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                            {coin.name} &rarr;
                        </Link>
                    </Coin>
                ))}
            </CoinsList>
            )}
        </Container>
    );
}

export default Coins;