"use client"

import React, { useEffect, useState, useActionState } from "react"
import { PencilSquare as Edit, Trash } from "@medusajs/icons"
import { Button, Heading, Text, clx } from "@medusajs/ui"
import { useTranslations } from "next-intl"

import useToggleState from "@lib/hooks/use-toggle-state"
import CountrySelect from "@modules/checkout/components/country-select"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import LocationSelect from "@modules/common/components/location-select"
import Spinner from "@modules/common/icons/spinner"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { HttpTypes } from "@medusajs/types"
import {
  deleteCustomerAddress,
  updateCustomerAddress,
} from "@lib/data/customer"

type EditAddressProps = {
  region: HttpTypes.StoreRegion
  address: HttpTypes.StoreCustomerAddress
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  isActive = false,
}) => {
  const t = useTranslations("account")
  const [removing, setRemoving] = useState(false)
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(updateCustomerAddress, {
    success: false,
    error: null,
    addressId: address.id,
  })

  const close = () => {
    setSuccessState(false)
    closeModal()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  const removeAddress = async () => {
    setRemoving(true)
    await deleteCustomerAddress(address.id)
    setRemoving(false)
  }

  const isColombia = address.country_code === "co" || region.countries?.some((c) => c.iso_2 === "co")

  return (
    <>
      <div
        className={clx(
          "border rounded-rounded p-5 min-h-[220px] h-full w-full flex flex-col justify-between transition-colors",
          {
            "border-gray-900": isActive,
          }
        )}
        data-testid="address-container"
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Heading
              className="text-left text-base-semi"
              data-testid="address-name"
            >
              {address.address_name || `${address.first_name} ${address.last_name}`}
            </Heading>
            {address.is_default_shipping && (
              <span className="px-2 py-0.5 text-[10px] font-medium bg-emerald-100 text-emerald-700 rounded-full uppercase">
                {t("defaultAddress")}
              </span>
            )}
          </div>
          {address.address_name && (
            <Text className="txt-compact-small text-ui-fg-subtle">
              {address.first_name} {address.last_name}
            </Text>
          )}
          {address.company && (
            <Text
              className="txt-compact-small text-ui-fg-base"
              data-testid="address-company"
            >
              {address.company}
            </Text>
          )}
          <Text className="flex flex-col text-left text-base-regular mt-2">
            <span data-testid="address-address">
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
            <span data-testid="address-postal-city">
              {address.city}
            </span>
            <span data-testid="address-province-country">
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </span>
          </Text>
        </div>
        <div className="flex items-center gap-x-4">
          <button
            className="text-small-regular text-ui-fg-base flex items-center gap-x-2"
            onClick={open}
            data-testid="address-edit-button"
          >
            <Edit />
            {t("edit")}
          </button>
          <button
            className="text-small-regular text-ui-fg-base flex items-center gap-x-2"
            onClick={removeAddress}
            data-testid="address-delete-button"
          >
            {removing ? <Spinner /> : <Trash />}
            {t("removeAddress")}
          </button>
        </div>
      </div>

      <Modal isOpen={state} close={close} data-testid="edit-address-modal">
        <Modal.Title>
          <Heading className="mb-2">{t("editAddress")}</Heading>
        </Modal.Title>
        <form action={formAction}>
          <input type="hidden" name="addressId" value={address.id} />
          <Modal.Body>
            <div className="grid grid-cols-1 gap-y-2">
              <Input
                label={t("addressName")}
                name="address_name"
                placeholder={t("addressNamePlaceholder")}
                defaultValue={address.address_name || undefined}
                data-testid="address-name-input"
              />
              <div className="grid grid-cols-2 gap-x-2">
                <Input
                  label={t("firstName")}
                  name="first_name"
                  required
                  autoComplete="given-name"
                  defaultValue={address.first_name || undefined}
                  data-testid="first-name-input"
                />
                <Input
                  label={t("lastName")}
                  name="last_name"
                  required
                  autoComplete="family-name"
                  defaultValue={address.last_name || undefined}
                  data-testid="last-name-input"
                />
              </div>
              <Input
                label={t("address")}
                name="address_1"
                required
                autoComplete="address-line1"
                defaultValue={address.address_1 || undefined}
                data-testid="address-1-input"
              />
              <Input
                label={t("apartment")}
                name="address_2"
                autoComplete="address-line2"
                defaultValue={address.address_2 || undefined}
                data-testid="address-2-input"
              />
              <CountrySelect
                name="country_code"
                region={region}
                required
                autoComplete="country"
                defaultValue={address.country_code || undefined}
                data-testid="country-select"
              />
              {isColombia ? (
                <div className="grid grid-cols-2 gap-x-2">
                  <LocationSelect
                    provinceValue={address.province || ""}
                    cityValue={address.city || ""}
                    required
                  />
                </div>
              ) : (
                <>
                  <Input
                    label={t("province")}
                    name="province"
                    autoComplete="address-level1"
                    defaultValue={address.province || undefined}
                    data-testid="state-input"
                  />
                  <Input
                    label={t("city")}
                    name="city"
                    required
                    autoComplete="locality"
                    defaultValue={address.city || undefined}
                    data-testid="city-input"
                  />
                </>
              )}
              <Input
                label={t("phone")}
                name="phone"
                autoComplete="phone"
                defaultValue={address.phone || undefined}
                data-testid="phone-input"
              />
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_default_shipping"
                  defaultChecked={address.is_default_shipping}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">{t("setAsDefault")}</span>
              </label>
            </div>
            {formState.error && (
              <div className="text-rose-500 text-small-regular py-2">
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="flex gap-3 mt-6">
              <Button
                type="reset"
                variant="secondary"
                onClick={close}
                className="h-10"
                data-testid="cancel-button"
              >
                {t("cancel")}
              </Button>
              <SubmitButton data-testid="save-button">{t("save")}</SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default EditAddress
