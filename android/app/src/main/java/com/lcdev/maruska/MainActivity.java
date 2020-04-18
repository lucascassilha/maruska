package com.lcdev.maruska;

import com.facebook.react.ReactActivity;
import com.calendarevents.CalendarEventsPackage;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
   @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    CalendarEventsPackage.onRequestPermissionsResult(requestCode, permissions, grantResults);
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
  }

  @Override
  protected String getMainComponentName() {
    return "Maruska";
  }
}
