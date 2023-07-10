import { ID_TO_CAPTURE } from '@features/TakeScreenshot/config/id';
import { Button } from '@shared/ui/Button';
import html2canvas from 'html2canvas';
import { Camera } from 'lucide-react';

export function TakeScreenshot() {
  const onScreenshot = () => {
    const element = document.getElementById(ID_TO_CAPTURE);

    if (element) {
      void html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'screenshot.png';
        link.click();
      });
    }
  };

  return (
    <Button onClick={onScreenshot}>
      <Camera className="w-5 h-5" />
    </Button>
  );
}
