import React, { useEffect, useState } from "react";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import PopupSliderData from "./PopupSliderData";
import Spinner from "../../../../commons/components/Spinner/Spinner";
import { loadMore } from "../../../../utils";

const PAGE_SIZE = 20;

const PopupSliderArray = ({ sliderData }) => {
  // This is for the infinite scroll simulator to not render all the data at once.
  const [dataLoader, setDataLoader] = useState([]);
  // This is for the infinite scroll simulator to conditionally show the spinner.
  const [isLoaderSpinner, setIsLoaderSpinner] = useState(true);
  // This is for the infinite scroll simulator to paginate.
  const [page, setPage] = useState(1);

  // This is for the infinite scroll simulator that initializes the dataLoader if the
  // API data is an array and not an object.
  useEffect(() => {
    if (
      sliderData &&
      typeof sliderData === "object" &&
      Array.isArray(sliderData)
    ) {
      setDataLoader(sliderData.slice(0, PAGE_SIZE));
    }
  }, []);

  return (
    <BottomSheetFlatList
      data={dataLoader}
      initialNumToRender={PAGE_SIZE}
      onEndReached={() => {
        // This is done because the onEndReached would still be activated even when
        // you reach to the end of the Slider scroll.
        if (dataLoader.length !== sliderData.length) {
          setDataLoader((prevState) => {
            const newData = loadMore(sliderData, page, PAGE_SIZE, setPage);

            return prevState.concat(newData);
          });
        }

        // If the length of the dataLoader equals the same as the sliderData, then stop
        // the Spinner.
        dataLoader.length === sliderData.length
          ? setIsLoaderSpinner(false)
          : setIsLoaderSpinner(true);
      }}
      ListFooterComponent={isLoaderSpinner ? <Spinner /> : null}
      keyExtractor={(item, index) => `${item.county}-${index}`}
      renderItem={({ item }) => (
        <PopupSliderData
          cases={item.cases}
          country={item.country}
          county={item.county}
          deaths={item.deaths}
          hasTimelineSequence={item.hasTimelineSequence}
          population={item.population}
          provinces={item.provinces}
          recovered={item.recovered}
          state={item.state}
          updatedAt={item.updatedAt}
          hasVaccines={item.hasVaccines}
        />
      )}
    />
  );
};

export default PopupSliderArray;
