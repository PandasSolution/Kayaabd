import { set_price_value } from "@/redux/features/filter";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import InputRange from "@/ui/input-range";
import { maxPrice } from "@/utils/utils";
import { useRouter } from "next/navigation";

const PriceFilter = ({
  categoryParam,
  brandParam,
  sortParam,
  setLoading,
}: any) => {
  const router = useRouter();
  const { priceValue } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  // handleChanges
  const handleChanges = (val: number[]) => {
    dispatch(set_price_value(val));
  };

  const handleChangesPrice = () => {
    setLoading(true);
    router.push(
      `/shop?category=${categoryParam ?? ""}&brand=${brandParam ?? ""}&price=${
        priceValue[1] ?? "1000000"
      }&sort=${sortParam ?? ""}`
    );
    setLoading(false);
  };

  return (
    <div className="sidebar__widget mb-55">
      <div className="sidebar__widget-title mb-30">
        <h3>Filter By Price</h3>
      </div>
      <div className="sidebar__widget-content">
        <div className="price__slider">
          <div className="mb-25">
            <InputRange
              MAX={maxPrice()}
              MIN={0}
              STEP={1}
              values={priceValue}
              handleChanges={handleChanges}
              // handleChanges={(e)=>handleChangesPrice(e)}
            />
          </div>
          <div>
            <button type="submit" onClick={() => handleChangesPrice()}>
              Filter
            </button>
            <label htmlFor="amount">Price :</label>
            <span className="input-range">
              {priceValue[0]} TK - {priceValue[1]} TK
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
