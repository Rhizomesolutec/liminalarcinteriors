"use client";
import ServiceModal from "@/components/admin/serviceForm";
import ServicesAdminPanel from "@/components/admin/servicesAdminPanel";
import React, { useState } from "react";
import UpdateServiceModal from "../updateService";
import { Service } from "@/types/type";

export default function ServiceServalcomponent({ inistalData }:{inistalData: Service[]}) {
  const [currentModal, setCurrentModal] = useState(false);
  const [services, setServices] = useState(inistalData || []);
  const [selectServices, setSelectServices] = useState<Service|null>(null);

  const fetchData = async () => {
    const res = await fetch("/api/services/getServices");
    const { data } = await res.json();
    setServices(data);
    console.log(data);
  };

  return (
    <>
      {!selectServices && !currentModal && (
        <ServicesAdminPanel
          setSelectServices={setSelectServices}
          services={services}
          open={setCurrentModal}
          fetchData={fetchData}
        />
      )}
      {!selectServices && currentModal && (
        <ServiceModal
          open={setCurrentModal}
          callBack={() => {
            fetchData();
            setCurrentModal(false);
          }}
        />
      )}
      {selectServices && (
        <UpdateServiceModal
          data={selectServices}
          callBack={() => {
            fetchData();
            setCurrentModal(false);
            setSelectServices(null)
          }}
        />
      )}
    </>
  );
}
