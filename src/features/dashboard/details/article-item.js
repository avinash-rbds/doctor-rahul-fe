import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import moment from "moment";
import Box from "@mui/material/Box";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { calcuteTimeForFeedFromNow } from "../../../utils/functions";
import DummyImage from "../../../assets/images/dummy-image.svg";

const ArticleItem = ({ data }) => {
    const history = useHistory();
    const { path } = useRouteMatch();
    const { id, title, description, bannerImage, timestamp } = data;

    const handleNavigation = (event, id) => {
        event.preventDefault();
        history.push(`${path}-articles/${id}`);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                bgcolor: "background.paper",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: 1,
                cursor: "pointer",
                maxHeight: 167,
            }}
            key={id}
            onClick={(e) => handleNavigation(e, id)}
        >
            <Box
                component="img"
                sx={{
                    height: 233,
                    width: 350,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    objectFit: "cover",
                    padding:
                        bannerImage !== null || bannerImage !== "" ? 0 : 12,
                }}
                alt={`image - ${title}`}
                src={
                    bannerImage !== null || bannerImage !== ""
                        ? bannerImage
                        : DummyImage
                }
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: { xs: "center", md: "flex-start" },
                    m: 3,
                    minWidth: { md: 350 },
                }}
            >
                <Box
                    component="span"
                    sx={{ fontSize: 16, mt: 1, fontWeight: "bold" }}
                >
                    {title}
                </Box>
                <Box
                    component="span"
                    sx={{ color: () => alpha("#424242", 0.75), fontSize: 14 }}
                >
                    {description}
                </Box>

                {timestamp && (
                    <Box
                        component="span"
                        sx={{
                            color: () => alpha("#757575", 0.8),
                            fontSize: 13,
                            mt: 2,
                        }}
                    >
                        {moment(timestamp).format("DD/MMM/YYYY - ha")}
                    </Box>
                )}

                <Box
                    sx={{
                        mt: 0.5,
                        p: 0.4,
                        backgroundColor: (theme) =>
                            alpha(theme.palette.primary.main, 0.1),
                        borderRadius: "5px",
                        color: "primary.main",
                        fontWeight: "medium",
                        display: "flex",
                        fontSize: 11,
                        alignItems: "center",
                        "& svg": {
                            fontSize: 14,
                            mr: 0.5,
                        },
                    }}
                >
                    <AccessTimeIcon />
                    {timestamp ? calcuteTimeForFeedFromNow(timestamp) : "-"}
                </Box>
            </Box>
        </Box>
    );
};

export default ArticleItem;
