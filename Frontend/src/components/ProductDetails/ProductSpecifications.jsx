const ProductSpecifications = ({ specifications = [] }) => {

    if (!specifications.length) return null;

    return (

        <div className="product-specifications">

            <h2 className="section-title">
                Specifications
            </h2>

            <table className="specification-table">

                <tbody>

                    {specifications.map((item, index) => (

                        <tr key={index}>

                            <td className="spec-key">
                                {item.key}
                            </td>

                            <td className="spec-value">
                                {item.value}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default ProductSpecifications;