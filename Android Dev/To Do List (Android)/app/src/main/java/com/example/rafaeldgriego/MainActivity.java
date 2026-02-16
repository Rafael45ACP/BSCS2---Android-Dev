package com.example.rafaeldgriego;



import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    Button btnIMan, btnPPanther;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        btnIMan = findViewById(R.id.btnIMan);
        btnPPanther = findViewById(R.id.btnPPanther);


        btnIMan.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                btnIMan.setVisibility(View.INVISIBLE);
            }
        });


        btnPPanther.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                Toast.makeText(
                        MainActivity.this,
                        "to do, to do, to do, to do...",
                        Toast.LENGTH_SHORT
                ).show();


                btnIMan.setVisibility(View.VISIBLE);
            }
        });
    }
}
