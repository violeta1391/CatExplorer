import { useState, useMemo } from "react";
import { Cat } from "../../types/Cat";
import { useCatContext } from "../../context/CatContext";
import { useCatImagesByBreedIds } from "../../hooks/useCatImages";
import { CatInfoModal } from "../CatInfoModal/CatInfoModal";
import { Box, Typography, CircularProgress, Zoom, Card, CardMedia, Button } from "@mui/material";

export const CatImageGallery = () => {
  const { cats, selectedOrigin, sortOrder, searchTerm } = useCatContext();
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedCat, setSelectedCat] = useState<(Cat & { temperament: string; imageUrl: string }) | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedCats = useMemo(() => {
    let filtered = cats;

    if (selectedOrigin && selectedOrigin !== "All") {
      filtered = filtered.filter((cat) => cat.origin === selectedOrigin);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return [...filtered].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }, [cats, selectedOrigin, sortOrder, searchTerm]);

  const breedIds = sortedCats.map((cat) => cat.id);
  const { data, loading, error } = useCatImagesByBreedIds(breedIds, "");

  const images = useMemo(() => {
    if (!data) return [];
    return data.map((img, idx) => ({
      id: img[0]?.id ?? `img-${idx}`,
      url: img[0]?.url ?? "",
      breedName: sortedCats[idx]?.name ?? "Unknown",
    }));
  }, [data, sortedCats]);

  const handleOpenModal = (cat: Cat & { imageUrl: string }) => {
    setSelectedCat({
      ...cat,
      temperament: cat.temperament ?? "Unknown",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCat(null);
  };

  return (
    <Box mt={4} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6" gutterBottom>
        {selectedOrigin && selectedOrigin !== "All"
          ? `Cats from ${selectedOrigin}`
          : "Cat Gallery"}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Error loading images</Typography>
      ) : images.length > 0 ? (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 2,
              width: "100%",
              maxWidth: 1000,
            }}
          >
            {images.slice(0, visibleCount).map((img, idx) => (
              <Zoom in key={img.id}>
                <Card
                  sx={{
                    position: "relative",
                    height: 200,
                    overflow: "hidden",
                    cursor: "pointer",
                    borderRadius: 3,
                    transition: "transform 0.3s ease",
                    boxShadow: 3,
                    "&:hover img": {
                      transform: "scale(1.1)",
                    },
                  }}
                  onClick={() =>
                    handleOpenModal({
                      ...sortedCats[idx],
                      temperament: sortedCats[idx].temperament ?? "Unknown",
                      imageUrl: img.url,
                    })
                  }
                >
                  <CardMedia
                    component="img"
                    image={img.url}
                    alt={img.breedName}
                    sx={{
                      objectFit: "cover",
                      height: "100%",
                      width: "100%",
                      transition: "transform 0.3s ease",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "white",
                      textAlign: "center",
                      py: 1,
                    }}
                  >
                    <Typography variant="body2">{img.breedName}</Typography>
                  </Box>
                </Card>
              </Zoom>
            ))}
          </Box>

          {visibleCount < images.length && (
            <Box mt={3}>
              <Button
                variant="outlined"
                onClick={() => setVisibleCount((v) => v + 12)}
              >
                Show more
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Typography>No images found.</Typography>
      )}

      <CatInfoModal
        open={isModalOpen}
        onClose={handleCloseModal}
        cat={selectedCat}
      />
    </Box>
  );
};
