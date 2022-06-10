import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
    padding: 0 20px;
`;

const Header = styled.div`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul`
    
`;

const Coin = styled.li`
    background-color: white;
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
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Header>
                <Title>코인</Title>
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