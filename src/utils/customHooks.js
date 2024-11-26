import { useCallback, useEffect, useMemo, useState } from "react"
import { toast } from "react-toastify";
import { IDENTITY_TOKEN } from "./constant";

export const useApi = (API, method, body) => {
  const token = useMemo(() => sessionStorage.getItem("token"), [])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // fetch data required for the creating progress line chart
  const fetchData = useCallback(() => {
    setLoading(true)
    fetch(API, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-USER-IDENTITY": IDENTITY_TOKEN,
      },
      body: body,
    })
    .then((response) => response.json())
    .then((data) => setData(data))
    .catch((error) => {
      toast.error('Failed to fetch Metrics Options, Try after some time!')
      setError(error)
    })
    .finally(() => setLoading(false))
  }, [API, body, method, token]);

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return [data, loading, error]
}