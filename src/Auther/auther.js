import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import { getAuthorData } from './Store/autherSliceData';
import ConstantHelper from '../Helper/ConstantHelper';
import Loading from '../Helper/Loading';

const Authers = () => {

    const dispatch = useDispatch();

    const [data, setData] = useState([])
    const [fetchDataLength, setFetchDataLength] = useState(0);
    const [isCall, setIsCall] = useState(true);
    const [hasNewData, setHasNewData] = useState(true);
    const { userData } = useSelector(state => state.auther)

    useEffect(() => {
        dispatch(getAuthorData({ id: null }))
        setIsCall(true);
        document.title = ConstantHelper.authorListTitle;
    }, [])

    useEffect(() => {
        fetchNewData(userData)
    }, [userData])

    const fetchNewData = (autherDataList) => {
        let get_old_data = data;
        let auther_data = [];
        if (autherDataList && autherDataList.length > 0 && autherDataList.length >= fetchDataLength && isCall) {
            for (let i = 0; i < fetchDataLength + 10; i++) {
                auther_data.push(autherDataList[i])
            }
            setFetchDataLength(fetchDataLength + 10);
            get_old_data = get_old_data.concat(auther_data);
            setData(get_old_data);
        }
    }

    const fetchAutherData = () => {
        if (data?.length >= userData.length) {
            setHasNewData(false);
            return;
        }
        setTimeout(() => {
            fetchNewData(userData)
            setHasNewData(true);
        }, 500);
    }
    return (
        <>
            <div>
            <div className="col">
                <div className="text-center m-2 text-2xl">
                    {ConstantHelper.authorListTitle}
                </div>
                <div id="autherList" className="customListView">
                    <InfiniteScroll
                        dataLength={data.length}
                        next={fetchAutherData}
                        hasMore={hasNewData}
                        loader={<p className="text-center"> <Loading /> </p>}
                        endMessage={
                            <p className="text-center mt-10">
                                {ConstantHelper.noMoreDataTitle}
                            </p>
                        }
                        scrollableTarget="autherList"
                    >
                        {
                            data && data.length > 0 ?
                                data.map((item, index) => (
                                    <>
                                    {(item && item.id) &&
                                    <div className="box-shadow border-2 mx-24 p-4 rounded mt-4 mb-4" style={{backgroundColor : '#f0f0f0'}}>
                                            <div className="font-bold">
                                                <NavLink className="nav-link ml-3" aria-current="page" to={`/details/${item.id}`}>
                                                <i class="fa fa-dot-circle-o mr-1" aria-hidden="true"></i>{' ' + item.name}
                                                </NavLink>
                                            </div>
                                    </div>}
                                    </>
                                )) : ''
                        }
                    </InfiniteScroll>
                </div>
            </div>
            </div>
        </>
    )
}

export default Authers;