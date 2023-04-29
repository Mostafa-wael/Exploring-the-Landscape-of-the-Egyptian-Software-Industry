function getLicensesAndCertificationsObject(el) {
    const obj = {
        title: "",
        issuer: "",
        date: ""
    }

    const firstDiv = el.querySelector("div");

    if (firstDiv.getAttribute("class").replace(/\s+/g, ' ').trim() !== "pvs-entity pvs-entity--padded pvs-list__item--no-padding-in-columns".replace(/\s+/g, ' ').trim()) return;
    const secondDiv = firstDiv.querySelector("div:nth-child(2)");
    const mainDiv = secondDiv.querySelectorAll("div")[0];

    const parentSpan = mainDiv.querySelector(".t-bold");
    if (parentSpan && parentSpan.querySelector("span")) {
        const title = parentSpan.querySelector("span");
        obj.title = title.innerHTML;
    }

    const companyDateLocationSpans = mainDiv.querySelectorAll(".t-normal");
    for (var i = 0; i < companyDateLocationSpans.length; i++) {
        const companyDateLocationSpan = companyDateLocationSpans[i];
        if (companyDateLocationSpan && companyDateLocationSpan.querySelector("span")) {
            const companyDateLocation = companyDateLocationSpan.querySelector("span");
            if (i === 0) {
                obj.issuer = companyDateLocation.innerHTML;
            }
            if (i === 1) {
                obj.date = companyDateLocation.innerHTML;
            }
        }
    }
    return obj;
}

export default function getLicensesAndCertifications(html_root) {
    const licensesAndCertifications = html_root.querySelectorAll("section").filter((el) => el.querySelector("#licenses_and_certifications"))
    if (licensesAndCertifications && licensesAndCertifications.length > 0) {
        const licensesAndCertificationsUl = licensesAndCertifications[0].querySelector("ul");
        const lis = Array.from(licensesAndCertificationsUl.querySelectorAll("li"));

        const licensesAndCertificationsArray = lis.map(getLicensesAndCertificationsObject).filter((el) => el !== undefined);

        console.log("licensesAndCertificationsArray: ", licensesAndCertificationsArray);
        return licensesAndCertificationsArray;
    }
    return [];
}