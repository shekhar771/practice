import React, { useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";
import { registerMenuitemApi } from "../api";
import set from "lodash/set";
import { Toast } from "primereact/toast";
import { Chips } from "primereact/chips";

import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Navbar } from "./ad";
import axios from "axios";
import { RadioButton } from "primereact/radiobutton";

export const MenuItems = () => {
    const toast = useRef(null);
    const [names, setNames] = useState("");
    const MenuDetails_empty = {
        restaurant_id: [""],
        branch_id: [""],
        menuitem: {
            name: "",
            description: "",
            alternateName: [""],
            thumbnail: "",
            images: [""],
            similarItems: [""],
            isVegetarian: false,
            prices: [
                {
                    quantity: "full",
                    amount: 0,
                    discount: {
                        type: "percent",
                        amount: 0,
                        maxDiscount: 0,
                        minAmount: 0,
                    },
                },
                {
                    quantity: "Full",
                    amount: 180,
                    discount: {
                        type: "percent",
                        amount: 0,
                        maxDiscount: 0,
                        minAmount: 0,
                    },
                },
            ],
        },
        images: [""],
    };
    const [menuDetails, setMenuDetails] = useState(MenuDetails_empty);

    const MenuDetailsChangeHandler = (path, value) => {
        setMenuDetails((ps) => ({ ...set(ps, path, value) }));
    };

    const saveMenu = async () => {
        const res = await registerMenuitemApi(menuDetails);
        if (res) {
            if (res.status === 201) {
                toast.current.show({ severity: "success", summary: "Successful", detail: res.data.msg, life: 5000 });
            }
        }
    };
    const uploadImage = () => {
        console.log();
        uploadMenu();
    };
    const invoiceUploadHandler = ({ files }) => {
        const [file] = files;
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            uploadMenu(e.target.result);
        };
        fileReader.readAsDataURL(file);
    };
    const uploadMenu = async (imagess) => {
        let formData = new FormData();
        formData.append("images", imagess);
        const a = { images: formData };
        console.log(formData);
        // const response = await axios.post(`/registration/menuitem`, {
        //     body: formData,
        // });
    };
    const namesDiv = (e) => {
        setNames(e.value);
        MenuDetailsChangeHandler("menuDetails.menuitem.name", e.value[0]);
        MenuDetailsChangeHandler("menuDetails.menuitem.name", e.value.slice(1, e.value.length));

        console.log(e.value[0]);
    };
    return (
        <div className="m-7">
            <Toast ref={toast} />
            {/* <Navbar /> */}
            {/* <MenuItems /> */}

            <div className="min-h-screen p-3 md:p-4">
                {/* <div className="h-screen flex ai-center"> */}
                {/* login side */}
                <div className="card h-full card-container w-12 lg:w-10 xl:w-8 mx-auto">
                    {/* <div className="card max-w-24rem md:w-30rem mx-auto h-fit-content mt-8"> */}
                    <h3 className="m-3 ">Upload Menu Item</h3>

                    <div className="p-fluid formgrid grid mt-2">
                        <label htmlFor="image" className="p-3 ">
                            Item Names
                        </label>
                        <Chips value={names} placeholder="salads" className="w-full " onChange={namesDiv} />
                    </div>
                    <div className="p-fluid formgrid grid p-2">
                        <label htmlFor="Item">Item Price</label>
                        <InputNumber
                            value={menuDetails.menuitem.prices.amount}
                            onChange={(e) => {
                                MenuDetailsChangeHandler("menuitem.prices.amount", e.target.value);
                            }}
                            placeholder="₹ 100.0"
                            showButtons
                            mode="currency"
                            currency="inr"
                        />
                    </div>

                    <div className="field-checkbox pl  pt-2">
                        <label htmlFor="image" className="p-3 ">
                            Item Image
                        </label>
                        <FileUpload accept="image/*" customUpload={true} className="p-2 pt-3" uploadHandler={invoiceUploadHandler} mode="basic" multiple chooseLabel="Upload Image" />
                    </div>

                    <div className="field-checkbox pl  pt-2 ">
                        <Checkbox inputId="binary" checked={menuDetails.menuitem.isVegetarian} onChange={(e) => MenuDetailsChangeHandler("menuitem.isVegetarian", e.checked)} />

                        <label htmlFor="binary">Vegetarian</label>
                    </div>

                    <div className="p-fluid formgrid grid p-2">
                        <label htmlFor="ItemDes">Item Description</label>
                        <InputTextarea
                            id="itemDes"
                            value={menuDetails.menuitem.description}
                            onChange={(e) => {
                                MenuDetailsChangeHandler("menuitem.description", e.target.value);
                            }}
                            rows={3}
                            cols={20}
                        />
                    </div>
                    <Button icon="pi " label="Submit" className="w-full" onClick={saveMenu} />
                </div>
            </div>
            <div>
                {/* <div className="field-checkbox">
                    <Checkbox inputId="binary" checked={checked} onChange={(e) => setChecked(e.checked)} />
                    <label htmlFor="binary">Remember Me</label>
                </div> */}
            </div>
        </div>
    );
};
