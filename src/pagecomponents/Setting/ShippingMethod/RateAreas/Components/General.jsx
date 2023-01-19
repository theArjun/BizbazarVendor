import axios from "axios";
import React, { useState } from "react";
import { Card, Input, Tag } from "antd";
import styles from "./General.module.css";
import data from "./nepal.json";
import { useEffect } from "react";
import { Select } from "antd";

const { Meta } = Card;
const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];

function GeneralRateAreas() {
  const [country, setCountry] = useState(["Nepal"]);
  const [state, setState] = useState(["Nepal"]);
  const [tag, setTag] = useState("");
  const [tagState, setTagState] = useState("");

  const filteredOptions = OPTIONS.filter((o) => !country.includes(o));

  useEffect(() => {
    getApi();
  }, []);

  const getApi = async () => {
    const result = await axios({
      url: "https://api.instantwebtools.net/v1/passenger?page=0&size=10",
      method: "get",
    });
    console.log(result);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topInfo}>
        <div>Name: Kathmandu </div>
        <div>
          Status: <Tag color="#87d068">Active</Tag>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeading}>Country :</div>
          <div ClassName={styles.tagContainer}>
            {/* {country.map((dat, i) => (
              <Tag key={i} className={styles.tagCountry} color="#87d068">
                {dat}
                <span
                  className={styles.deleteTag}
                  onClick={() => {
                    setCountry((dat) => {
                      const temp = [...dat];
                      temp.splice(i, 1);

                      return temp;
                    });
                  }}
                >
                  x
                </span>
              </Tag>
            ))} */}
            <div className={styles.countryInputWrap}>
              {/* <Input
                style={{ width: "100px" }}
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              /> */}
              <Select
                mode="multiple"
                placeholder="Inserted are removed"
                value={country}
                onChange={setCountry}
                style={{
                  width: "100%",
                }}
                options={filteredOptions.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </div>

            {tag.length > 1 && (
              <button
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  if (tag.length > 1) {
                    setCountry((dat) => [...dat, tag]);
                    setTag("");
                    return;
                  }
                  alert("You are adding imty tag");
                }}
              >
                Add
              </button>
            )}
          </div>
        </div>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeading}>State :</div>
          <div ClassName={styles.tagContainer}>
            {state.map((dat, i) => (
              <Tag key={i} className={styles.tagCountry} color="#87d068">
                {dat}
                <span
                  className={styles.deleteTag}
                  onClick={() => {
                    setState((dat) => {
                      const temp = [...dat];
                      temp.splice(i, 1);

                      return temp;
                    });
                  }}
                >
                  x
                </span>
              </Tag>
            ))}

            <Input
              style={{ width: "100px" }}
              value={tagState}
              onChange={(e) => setTagState(e.target.value)}
            />
            {tagState.length > 1 && (
              <button
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  if (tagState.length > 1) {
                    setState((dat) => [...dat, tagState]);
                    setTagState("");
                    return;
                  }
                  alert("You are adding imty tag");
                }}
              >
                Add
              </button>
            )}
          </div>
        </div>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeading}>Zip/Postal codes :</div>
          <div ClassName={styles.leftContain}>
            <div>
              {" "}
              You are able to use wildcards in this field: '?' - any single
              character;'*' - any number of characters.
            </div>
            <div>
              Example: <br />
              <b>98?78</b> (corresponds to 98878, 98378, 98978, etc) 12*
              (corresponds to 12345, 12876, 12098, etc..)
            </div>
          </div>
        </div>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeading}>Cities :</div>
          <div ClassName={styles.leftContain}>
            <div>
              {" "}
              You are able to use wildcards in this field: '?' - any single
              character;'*' - any number of characters.
            </div>
          </div>
        </div>
        <div className={styles.sectionContainer}>
          <div>Kathmandu :</div>
          <div ClassName={styles.leftContain}>
            <div>
              Example: <br /> New Y* (corresponds to New York, New Yark, etc)
              L?s* (corresponds to Las Vegas, Los Angeles, etc..)
            </div>
          </div>
        </div>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeading}>Addresses :</div>
          <div ClassName={styles.leftContain}>
            <div>
              {" "}
              You are able to use wildcards in this field: '?' - any single
              character;'*' - any number of characters.
            </div>
            <div>
              Example: <br />* street (corresponds to 1st Street, 102nd Street,
              etc)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralRateAreas;
