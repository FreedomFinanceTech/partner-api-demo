'use client';

import {useEffect} from "react";
import Head from "next/head";
import Header from "@/app/components/Header";
import {
    EmbeddedCardFormStage,
    EmbeddedPanelType,
    EmbeddedPrimaryAddressPayloadSetters,
    EmbeddedPrimaryAddressStages,
    useEmbeddedStageStore
} from "@/app/state/embedded_stages";
import '../app/globals.css'
import EmbeddedAllOffersPayloadStage from "@/app/components/stages/embedded/EmbeddedAllOffersPayloadStage";
import EmbeddedAboutYouStage from "@/app/components/stages/embedded/EmbeddedAboutYouStage";
import EmbeddedCardStage from "@/app/components/stages/embedded/EmbeddedCardStage";
import EmbeddedMarketingConsentStage from "@/app/components/stages/embedded/EmbeddedMarketingConsentStage";
import EmbeddedCurrentEmploymentStage from "@/app/components/stages/embedded/EmbeddedCurrentEmploymentStage";
import EmbeddedExpenditureStage from "@/app/components/stages/embedded/EmbeddedExpenditureStage";
import EmbeddedOtherIncomeStage from "@/app/components/stages/embedded/EmbeddedOtherIncomeStage";
import EmbeddedPrimaryAddressStage from "@/app/components/stages/embedded/EmbeddedPrimaryAddressStage";
import EmbeddedPartnerDetailsStage from "@/app/components/stages/embedded/EmbeddedPartnerDetailsStage";
import EmbeddedOfferTilesStage from "@/app/components/stages/embedded/EmbeddedOfferTilesStage";
import EmbeddedProceedPayloadStage from "@/app/components/stages/embedded/EmbeddedProceedPayloadStage";

const EmbeddedCard = () => {
    const formStage = useEmbeddedStageStore((state) => state.currentStage);

    const setPanelType = useEmbeddedStageStore((state) => state.setPanelType)

    useEffect(() => setPanelType(EmbeddedPanelType.CREDITCARD))

    return (
        <><Head>
            <title>Apply for a Credit Card</title>
            <link rel="shortcut icon" href="logo.png" type="image/x-icon"/>
        </Head>
            <Header showNav={false} headerBackgroundColor={"#3C0B5D"} headerTitle={"Eligibility API - Credit Card"}/>
            {
                formStage === EmbeddedCardFormStage.PartnerDetailsStage && (
                    <EmbeddedPartnerDetailsStage/>
                )
            }
            {
                formStage === EmbeddedCardFormStage.CardStage && (
                    <EmbeddedCardStage/>
                )
            }
            {
                formStage === EmbeddedCardFormStage.AboutYouStage && (
                    <EmbeddedAboutYouStage/>
                )
            }
            {
                formStage === EmbeddedCardFormStage.CurrentAddressStage && (
                    <EmbeddedPrimaryAddressStage title={"Current Address"}
                                                 addressPayloadName={EmbeddedPrimaryAddressStages.CURRENT_ADDRESS}
                                                 addressPayloadSetter={EmbeddedPrimaryAddressPayloadSetters.CURRENT_ADDRESS}/>
                )
            }
            {
                formStage === EmbeddedCardFormStage.EmploymentStage && (
                    <EmbeddedCurrentEmploymentStage/>
                )
            }
            {
                formStage === EmbeddedCardFormStage.ExpenditureStage && (
                    <EmbeddedExpenditureStage/>
                )
            }
            {
                formStage === EmbeddedCardFormStage.OtherIncomeStage && (
                    <EmbeddedOtherIncomeStage/>
                )
            }
            {
                formStage === EmbeddedCardFormStage.MarketingConsentStage && (
                    <EmbeddedMarketingConsentStage/>
                )
            }
            {
                formStage === EmbeddedCardFormStage.PayloadStage && (
                    <EmbeddedAllOffersPayloadStage/>
                )
            }
            {
                formStage === EmbeddedCardFormStage.OfferTilesStage && (
                    <EmbeddedOfferTilesStage/>
                )
            }
            {
                formStage === EmbeddedCardFormStage.ProceedOfferStage && (
                    <EmbeddedProceedPayloadStage/>
                )
            }
        </>
    );
}

export default EmbeddedCard;