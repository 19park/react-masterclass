import { useContext, useState } from "react";
import Switch from "react-switch";
import { AppContext } from "../App";

const ThemeSwitchButton = () => {
    const { themeMode, toggleTheme } = useContext(AppContext);
    const [checked, setChecked] = useState((themeMode === "dark"));

    const handleChange = (nextChecked: boolean) => {
        setChecked(nextChecked);
        toggleTheme();
    };
    return (
        <label htmlFor="small-radius-switch">
            <Switch
                checked={checked}
                onChange={handleChange}
                handleDiameter={28}
                offColor="#2f3640"
                onColor="#eee"
                offHandleColor="#eee"
                onHandleColor="#2f3640"
                height={40}
                width={70}
                borderRadius={6}
                activeBoxShadow="0px 0px 1px 2px #000"
                uncheckedIcon={
                <div
                    style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 14,
                    color: "fff",
                    paddingRight: 2
                    }}
                >
                    Dark
                </div>
                }
                checkedIcon={
                <div
                    style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 14,
                    color: "#2f3640",
                    paddingRight: 2
                    }}
                >
                    Light
                </div>
                }
                uncheckedHandleIcon={
                <svg viewBox="0 0 10 10" height="100%" width="100%" fill="#333">
                    <circle r={3} cx={5} cy={5} />
                </svg>
                }
                checkedHandleIcon={
                <svg viewBox="0 0 10 10" height="100%" width="100%" fill="#fff">
                    <circle r={3} cx={5} cy={5} />
                </svg>
                }
                className="react-switch"
                id="small-radius-switch"
            />
            </label>
    )
}

export default ThemeSwitchButton;