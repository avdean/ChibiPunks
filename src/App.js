import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import Web3 from "web3";
import 'rsuite/styles/index.less';
import "rsuite/dist/rsuite.min.css";
import { Panel, PanelGroup } from 'rsuite';
import { Carousel } from 'rsuite';
import { Notification, toaster } from 'rsuite';
import { Loader } from 'rsuite';
import { Badge } from 'rsuite';
import  Menu  from "./menu/Menu";


const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  font-family: 'Syne';
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: black;
  padding: 10px;
  letter-spacing: 2px;
  font-weight: bold;
  color: white;
  width: 270px;
  height: 50px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    color: silver;
  }
  @media (max-width: 1300px) {
    width: 200px;
    height: 50px;
    font-size: 0.75rem;
  }
`;

export const CTNButton = styled.button`
  font-family: 'SyneMono';
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: black;
  padding: 10px;
  letter-spacing: 2px;
  font-weight: bold;
  color: white;
  width: 270px;
  height: 50px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.5);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.5);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.5);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    color: silver;
  }
  @media (max-width: 1300px) {
    width: 200px;
    height: 50px;
    font-size: 0.75rem;
  }
`;

export const Maxbtn = styled.button`
  font-family: 'Syne';
  font-size: 0.75rem;
  border-radius: 10px;
  background-color: #FF6DDA;
  font-weight: bold;
  color: white;
  width: 80px;
  height: 30px;
  cursor: pointer;
  letter-spacing: 2px;
  :hover {
    color: black;
  }
  @media (max-width: 1300px) {
    width: 200px;
    height: 50px;
    font-size: 0.75rem;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
  background-color: transparent;
  padding: 10px;
  font-weight: bold;
  font-size: 30px;
  color: white;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    color: silver;
  }
`;

export const LogoDiv = styled.div`
padding:5px;
margin-left:5px;
display: flex;
align-items: center;
justify-content: center;
align-content: center;
gap: 10%;
@media (max-width: 767px) {
  padding-bottom:2%;
}
`;


export const StyledLogo = styled.img`
  display: inline;
  width: 300px;
  @media (max-width: 1100px) {
    width: 300px;
    padding-top:20px;
  @media (max-width: 767px) {
    width: 150px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: center;
  margin: auto;
  width: 50vw;
  border-radius: 40px;
  box-shadow:
  0 0 5px #000;            /* outer Black */
  background: #2A2A2A;
    @media (min-width: 767px) {
    flex-direction: row;
    width: 70vw;
  }
`;

export const LoreContainer = styled.div`
  display: flex-container;
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: auto;
  margin-top:10vh;
  width: 70%;
  border-radius: 40px;
  background: #2A2A2A;
  box-shadow:
  0 0 5px #000,            /* outer Black */
  -10px 0 80px #f0f,        /* outer left magenta */
  10px 0 80px #0ff;         /* outer right cyan */
    @media (min-width: 767px) {
    flex-direction: row;
  }
`;
export const CreatorContainer = styled.div`
  display: flex-container;
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: auto;
  margin-top:10vh;
  width: 70%;
  border-radius: 40px;
  background: #2A2A2A;
  box-shadow:
  0 0 5px #000,            /* outer Black */
  -10px 0 80px #0ff,        /* outer left cyan */
  10px 0 80px #f0f;         /* outer right magenta */
    @media (min-width: 767px) {
    flex-direction: row;
  }
`;


export const ResponsiveWrapperHeader = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom:2vh;
  width: 100%;
  max-height: 80px;
  @media (min-width: 1100px) {
    flex-direction: row;
  }
  @media (max-width: 1300px) {
    max-height: 220px;
  }
`;

export const StyledImg = styled.img`
  width: 30vw;
  border-radius: 16px;
  @media (min-width: 600px) {
    width: 100%;
  }
  @media (min-width: 700px) {
    width: 50%;
  }
  transition: width 0.5s;
  @media (min-width: 1300px) {
    width: 60%;
  }
`;
export const TopImage = styled.img`
  display:flex;
  justify-content:center;
  padding-left:5vw;
  width:95vw;
`;

export const Styledroad = styled.img`
  width: 100%;
  border-radius: 5px;
  transition: width 0.5s;
`;

export const StyledImgSmall = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 5px;
  @media (min-width: 900px) {
    width: 220px;
    height: 220px;
  }
  @media (min-width: 1000px) {
    width: 220px;
    height: 220px;
  }
  transition: width 0.5s;
  @media (max-width: 1300px) {
    width: 200px;
  }
`;

export const StyledLink = styled.a`
  font-family:'Syne';
  font-weight:600;
  color: var(--secondary);
  text-decoration: none;
`;

export const WalletBox = styled.div`
  text-decoration: none;
  background-color: transparent;
  font-weight: bold;
  font-size: 15px;
  width: 10vw;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1300px) {
    margin-top: 20px;
    width: 100vw;

  }
`;

export const MenuBox = styled.div`
  display: none;
  @media (max-width: 1100px) {
    display:flex;
  }    

`;


function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [walletAddress, setAddress] = useState("Not Connected");
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(``);
  const [tokens, settokens] = useState(1);
  const [brd, setbrd] = useState("2px solid #FFFFFF");
  const [bxsh, setbxsh] = useState("0px 0px 3px 0px #FFFFFF");
  const [DOT, setDOT] = useState("red");
  const [type, setType] = React.useState('info');
  const [placement, setPlacement] = React.useState('topStart');
  const errmessage = (
    <Notification type={'error'} header={'error'} closable>
     Sorry, something went wrong please try again later.
    </Notification>
  );
  const txmessage = (
    <Notification type={'success'} header={'success'} closable>
     Congrats, Mint Was successful.
    </Notification>
  );
  const mntmessage = (
    <Notification type={'info'} header={'success'} closable>
     <Loader/> Minting in Progress....
    </Notification>
  );
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    DISPLAY_COST: 0,
    WL_Display: 0,
    GAS_LIMIT: 0,
    MAX_PER_TX: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    INSTAGRAM: "",
    GITBOOK:"",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    var cost = data.cost;
    let price = String(cost);
    console.log("Cost: ", price);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    setbrd("2px solid yellow");
    setbxsh("0px 0px 3px 0px yellow");
    toaster.push(mntmessage, { placement })
    blockchain.smartContract.methods
      .mint(tokens)
      .send({
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: price,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
        toaster.push(errmessage, { placement })
        setbrd("2px solid red");
        setbxsh("0px 0px 3px 0px red");
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        toaster.push(txmessage, { placement })
        setbrd("2px solid green");
        setbxsh("0px 0px 3px 0px green");
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementtokens = () => {
    let newtokens = tokens - 1;
    if (newtokens < 1) {
      newtokens = 1;
    }
    settokens(newtokens);
  };

  const incrementtokens = () => {
    let newtokens = tokens + 1;
    if (newtokens > CONFIG.MAX_PER_TX) {
      newtokens = CONFIG.MAX_PER_TX;
    }
    settokens(newtokens);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
      setAddress(blockchain.account.substring(0,4) + "..." + blockchain.account.substring(38,42));
      setDOT("green");
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
  <s.Screen>
      <s.Container
        flex={1}
        // ai={"center"}
        style={{background: "linear-gradient(45deg, rgba(17,17,17,1) 0%, rgba(135,77,184,1) 25%, rgba(184,83,204,1) 40%, rgba(234,87,146,1) 64%, rgba(124,213,231,1) 100%)" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}
      >
        <MenuBox>
        <Menu/>
        </MenuBox>

        <ResponsiveWrapperHeader>
          {/* Header Logo and Links */}
          <LogoDiv>
          <a href="#" target={"_blank"}>
            <StyledLogo alt={"logo"} src={"/config/images/logo.png"} />
          </a>
          </LogoDiv>

          <s.Headerlinks style={{ fontFamily: 'Syne'  }}>
            <s.StyledLink href="#story">
              Story
            </s.StyledLink >
            <s.StyledLink href="#about">
              About
            </s.StyledLink >
              <s.StyledLink href={CONFIG.Gitbook} target="_blank">
               Documentation
              </s.StyledLink>
              <s.StyledLink href={CONFIG.Instagram} target="_blank">
               Instagram
              </s.StyledLink>

          </s.Headerlinks>

          {/* Top Socials */}
          <WalletBox>
            {blockchain.account !== "" ? (
            <>
            <s.TextSubTitle style={{fontSize: "1rem", color: "white"}}>
            <Badge color={DOT}/> {walletAddress}
              </s.TextSubTitle>
            </>
            ) : null }
          </WalletBox>
      </ResponsiveWrapperHeader>

          {/* Top Image */}

      <TopImage src={"/config/images/ChibiPunks.png"} alt="image" id="sneak" />            
        <s.SpacerLarge/>

      
          {/* Title: Mint your etc. */}
        <s.Container flex={1} jc={"center"} ai={"center"}>
          <s.TextTitle>
            Mint Your {CONFIG.NFT_NAME}
          </s.TextTitle>
        </s.Container>

        <s.SpacerSmall />

          {/* Box: Mint box */}
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          {/* Left - Image */}
        <StyledImg src={"/config/images/72.png"} alt="image" />

          {/* Right - info */}
        <s.SpacerSmall/>
            <s.Container flex={1} jc={"center"} ai={"center"} >
           {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextSub
                  style={{ textAlign: "center", color: "var(--accent-text)", fontFamily: 'SyneMono' }}
                >
                  The sale has ended.
                </s.TextSub>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)", fontFamily: 'SyneMono' }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                <s.TextSub
                  style={{ textAlign: "center", color: "var(--accent-text)", fontFamily: 'SyneMono'  }}
                >
                  {data.totalSupply} | {CONFIG.MAX_SUPPLY}
                </s.TextSub>
                <s.SpacerSmall />
                <s.TextTotal style={{background: "white" , borderRadius: 5, padding: 8, color: "black"}}>
                      Price&emsp;&emsp;&emsp;&emsp;&emsp;{CONFIG.DISPLAY_COST}{" "}{CONFIG.NETWORK.SYMBOL}
                    </s.TextTotal>
                <s.SpacerMedium/>
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <>
                  <s.Container ai={"center"} jc={"center"}>
                    <s.SpacerSmall />

                  {/* Connect Button */}
                    <CTNButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT Wallet
                      <img style={{width: 30, paddingLeft: 10 }} src={"/config/images/mm.svg"} />
                    </CTNButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                            fontFamily: 'Syne',
                            fontSize: 20
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                  </>
                ) : (
                  <>
                    <s.AmountContainer style={{
                      border: brd,
                      boxShadow: bxsh,
                    }}>
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementtokens();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.TEXTamount>
                        &ensp;&ensp;&ensp;&ensp;{tokens}&ensp;&ensp;&ensp;&ensp;
                      </s.TEXTamount>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementtokens();
                        }}
                      >
                        +
                      </StyledRoundButton>
                    </s.AmountContainer>
                    <s.SpacerSmall />
                    <Maxbtn
                        onClick={(e) => {
                          e.preventDefault();
                          settokens(CONFIG.MAX_PER_TX);
                        }}
                        >
                      SetMax
                    </Maxbtn>
                    <s.SpacerSmall />
                    <s.SpacerSmall />
                    <s.TextTotal style={{color: "black"}}>
                      Total&emsp;&emsp;&emsp;&emsp;&emsp;{(CONFIG.DISPLAY_COST * tokens).toString().substring(0, 6)}{" "}{CONFIG.NETWORK.SYMBOL}
                    </s.TextTotal>
                    <s.SpacerSmall />
                    <s.SpacerXSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"column"}>
                            <StyledButton
                            disabled={claimingNft ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              claimNFTs();
                              getData();
                            }}
                          >
                            {claimingNft ? <Loader speed="fast" content="Minting..." /> : "MINT"}
                          </StyledButton>
                    </s.Container>
                    <s.SpacerXSmall/>
                    <s.TextSubTitle style={{fontSize: 15}}>
                    Max {CONFIG.MAX_PER_TX} Per Tx
                    </s.TextSubTitle>
                    <s.SpacerXSmall/>
                    <s.TextSubTitle style={{textAlign: "center", fontSize: "1rem"}}>
                    {feedback}
                    </s.TextSubTitle>
              </>
            )}
            </>
            )}
            <s.SpacerMedium />
            </s.Container>
          <s.SpacerLarge />
        </ResponsiveWrapper>

        <s.SpacerLarge />

    {/* Story / Lore */}
        <LoreContainer id="story">
          <s.TextTitle>STORY</s.TextTitle>
            <s.SpacerLarge/>
            <s.TextP>
          It began with four unlikely friends, at the turn of the second millennium, outcast for not fitting the roles society cast them. They would get up to their own version of mischief, loitering outside their local record store, etc. But over time their group grew, as they welcomed more and more of the outcast and different. 
            <br></br><br></br>
          One day an epiphany was revealed, society and its opinions didn’t matter. They decided to be themselves, band together and right the world themselves, so others wouldn’t have to suffer the same cruel fates and persecutions.
            </s.TextP>
          </LoreContainer>

        <CreatorContainer id="about">
          <s.TextTitle>WORDS FROM THE CREATORS</s.TextTitle>
            <s.SpacerLarge/>
            <s.TextP>
            ChibiPunks is a collection of adorable PFP punks, and a badge of support for those both different or misunderstood. The majority of the assets, development and smart contract was built by VagrantTea, with gracious contributions from the ever talented Frogwell.
            <br></br><br></br>
            The smart contract features both antibot minting and is ERC721A, making for cheaper gas fees! You can find out all of the details by checking out ChibPunks GitBook docs.             
            </s.TextP>
            <StyledButton href={CONFIG.Gitbook} target={"_blank"}>Documentation</StyledButton>
          </CreatorContainer>

            <s.SecContainer id="">
              <s.socialDiv>
                <a href={CONFIG.Instagram} target={"_blank"}>
                <s.Icons src="/config/images/instagram.svg" alt="Instagram" />
                </a>
              </s.socialDiv>
            <s.SpacerLarge/>
              <s.TextP>
              {CONFIG.NFT_NAME}
              </s.TextP>
          </s.SecContainer>

        <s.SpacerMedium />
      </s.Container>
    </s.Screen>
  );
}

export default App;
