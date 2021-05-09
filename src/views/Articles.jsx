import React, { useState, useEffect } from 'react';
import { getArticles } from 'api/requests';
import { makeStyles } from '@material-ui/core/styles';
import ListContainer from 'components/ListContainer';
import Card from 'components/Card';
import Drawer from 'components/Drawer';
import { toast } from 'react-toastify';

export const ArticleContext = React.createContext();

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
    },
    leftPane: {
        display: "inline-block",
        height: '100vh',
        width: '20%',
        borderRight: '6px solid #ccc' 
    },
    rightPane: {
        display: "inline-block",
        height: '100%',
        width: '80%',
    },
    innerPanel: {
        display: "flex",
        justifyContent: "center",
        padding: "5% 5% 5% 5%"
    }
}));

const Articles = props => {
    const classes = useStyles();
    const [orgArticles, setOrgArticles] = useState([]);
    const [articleList, setArticleList] = useState([]);
    const [article, setArticle] = useState('');
    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {

        const fetchArticles = async () => {
            try {
                let response = await getArticles();
                if(response?.data && response?.status === 200){
                    setOrgArticles(response.data);
                    setArticleList(response.data);
                }
                else{
                    toast.error("Error retrieving articles");
                }
            } catch (error) {
                toast.error("Error retrieving articles");
            }
        };

        fetchArticles();
    }, [])

    useEffect (() => {
        // when original list changes update the display list
        setArticleList(orgArticles);
    }, [orgArticles])

    const setSelectedArticle = article => {
        setArticle(article);
    }

    return (
        <div className={classes.root}>
            <ArticleContext.Provider value={{
                articleList: orgArticles,
                setArticles: (articles) => {
                    setOrgArticles(articles);
                },
                articleDisplay: articleList,
                setDisplayArticles: (articles) => {
                    setArticleList(articles);
                },
                setSelectedArticle: (article) => {
                    setArticle(article);
                }
            }}>
                <div className={classes.leftPane}>
                    <ListContainer 
                        list={articleList} 
                        setSelectedArticle={setSelectedArticle}
                        openDrawer={setOpenDrawer}
                    />
                </div>

                <div className={classes.rightPane}>
                    <div className={classes.innerPanel}>
                        {article && <Card article={article}/>}
                    </div>
                </div>

                <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
            </ArticleContext.Provider>
        </div>
    )
}

export default Articles;