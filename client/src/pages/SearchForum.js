import "../App.css";
import { images } from "../constants";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Form,
  Container,
  Button,
  Card,
  Badge
} from "react-bootstrap";
import { useParams, NavLink, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ForumCard from "../components/ForumCard";
import { Position, Toaster, Intent } from "@blueprintjs/core";

function SearchForum({isAuthenticated}) {
    let { keyword } = useParams();
    const [datas, setDatas] = useState(null)
    const [searchQuery, setSearchQuery] = useState("");
    const forums = datas

    console.log(keyword);

    const handleChange = (e) => {
        console.log(e.target.value);
        setSearchQuery(e.target.value);
    }

    useEffect(() => {
        fetch("http://localhost:5000/forums")
          .then((res) => res.json())
          .then((res) => {
              setDatas(res);
              setSearchQuery(keyword)
          })
      }, []);
    
    const filterPosts = (forums, query) => {
        if (!query) {
            return forums;
        }
    
        return forums.filter((forums) => {
            const postName = forums.title.toLowerCase();
            return postName.includes(query);
        });
    };

    const filteredPosts = filterPosts(forums, searchQuery);

    // const Search = () => (
    //     <form>
    //         <input
    //             value={searchQuery}
    //             onChange={e => handleChange(e)}
    //             type="text"
    //             placeholder="Search blog posts"
    //         />
            
    //         <button type="submit">Search</button>
    //     </form>
    // );

    const CardSearchResult = (props) => {
        return(
            <Card className="app-padding" style={{ marginBottom: 5 }}>
              <Link to={`/question/${props.data.forumID}`}>
                <Card.Subtitle>
                  📌{" " + props.data.title}
                </Card.Subtitle>
              </Link>
              <ListTag data={props.data} />
            </Card>
        )
    }

    const ListTag = (props) => {
        const _list = props.data.listSubject;
        // console.log(_list);
  
        const subjectTag = _list.map(
          (subject) => {
            return (
              <Badge bg="info" style={{ marginLeft: 4 }}>
                {subject}
              </Badge>
            );
          }
          // style={{backgroundColor:COLORS.black, color:COLORS.white, marginRight:5}}
        );
        return <div className="tag">{subjectTag}</div>;
      };
    
    const CurrentSearch = () => {
        return(
            <div className="header-seach">
                <div style={{fontFamily: "Krub-Regular", fontSize:30, fontWeight: "bold"}}>
                    ผลการค้นหา
                </div>
                <div style={{fontFamily: "Krub-Regular", fontSize:14}}>ผลการค้นหาสำหรับ : {keyword}</div>
                <div style={{fontFamily: "Krub-Regular", fontSize:14}}>{filteredPosts.length} ฟอรัม</div>
            </div>
        )
    }

    if(datas)
        return (
            <div>
                <Container fluid="xl">
                    <Row className="justify-content-md-center">
                    <Col md={3}>
                        
                    </Col>

                    <Col md={6}>
                        <CurrentSearch/>
                        <div className="search-result">
                            <ul>
                                {filteredPosts.map(forums => (
                                    <CardSearchResult data={forums}/>
                                ))}
                            </ul>
                        </div>
                    </Col>

                    <Col md={3} style={{paddingRight:40}}>
                       
                    </Col>
                    </Row>
                </Container>
            </div>
        
        );
    else{
        return(<div>Loading...</div>)
    }
}
export default SearchForum;
